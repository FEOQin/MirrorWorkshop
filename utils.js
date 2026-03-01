// utils.js
import { AwsClient } from './aws4fetch.js';

export async function getJSON(kv, key, defaultValue = null) {
  const val = await kv.get(key, 'json');
  return val !== null ? val : defaultValue;
}

export async function putJSON(kv, key, value) {
  await kv.put(key, JSON.stringify(value));
}

export function extractRegionFromEndpoint(ep) {
  const match = ep.match(/^s3\.([\w-]+)\.backblazeb2\.com$/);
  return match ? match[1] : 'us-east-1';
}

// 默认数据（用于初始化 KV）
export const defaultGithubProjects = [
  {
    name: 'vuejs/core',
    lastUpdate: '2025-03-12',
    homepage: 'https://github.com/vuejs/core',
    bucketId: 'default',
    versions: [
      {
        date: '2025-03-14',
        files: ['src/', 'README.md', 'package.json', 'index.js', '.gitignore'],
        releases: [
          { tag: 'v3.5.0', date: '2025-03-10' },
          { tag: 'v3.4.0', date: '2025-02-15' }
        ]
      },
      {
        date: '2025-02-10',
        files: ['src/', 'README.md', 'package.json', 'old.js', '.gitignore'],
        releases: [
          { tag: 'v3.4.0', date: '2025-02-15' }
        ]
      }
    ]
  }
];

export const defaultDockerProjects = [
  {
    name: 'library/nginx',
    lastUpdate: '2025-03-11',
    homepage: 'https://hub.docker.com/_/nginx',
    bucketId: 'bucket-2',
    versions: [
      {
        date: '2025-03-15',
        tags: ['latest', 'alpine', '1.27'],
        releases: [
          { tag: '1.27.0', date: '2025-03-10', digest: 'sha256:abc123' }
        ]
      }
    ]
  }
];

export const defaultBuckets = [
  { customName: '我的默认桶', id: 'default', usage: 2.3, total: 5, endpoint: 's3.ca-east-006.backblazeb2.com' },
  { customName: '我的桶2', id: 'bucket-2', usage: 1.1, total: 5, endpoint: 's3.eu-central-003.backblazeb2.com' },
  { customName: '我的桶3', id: 'bucket-3', usage: 0.4, total: 5, endpoint: 's3.us-west-001.backblazeb2.com' }
];

export const defaultConfig = {
  officialHostname: 'https://gh-mirror.example.com',
  bucketHostname: 'https://b2-mirror.example.com',
  monitor: { enabled: true, scope: 'all', customProjects: [], intervalDays: 1 }
};

// 从 B2 列出文件并解析版本
export async function fetchVersionsFromB2(bucketId, projectName, env) {
  const keyID = env[`B2_KEY_ID_${bucketId}`];
  const appKey = env[`B2_APP_KEY_${bucketId}`];
  if (!keyID || !appKey) {
    return [
      { date: new Date().toISOString().slice(0,10), files: ['file1.txt', 'file2.txt'] }
    ];
  }
  const buckets = await getJSON(env.B2_KV, 'buckets', defaultBuckets);
  const bucket = buckets.find(b => b.id === bucketId);
  if (!bucket) throw new Error('Bucket not found');
  const client = new AwsClient({
    accesskeyID: keyID,
    secretAccessKey: appKey,
    service: 's3',
    region: extractRegionFromEndpoint(bucket.endpoint)
  });
  const listUrl = `https://${bucket.id}.${bucket.endpoint}/?prefix=${encodeURIComponent(projectName)}/&delimiter=/`;
  const signed = await client.sign(listUrl, { method: 'GET' });
  const res = await fetch(signed.url, { headers: signed.headers });
  const xml = await res.text();
  const versionMatches = [...xml.matchAll(/<CommonPrefixes><Prefix>(.*?)<\/Prefix><\/CommonPrefixes>/g)];
  const versions = [];
  for (const match of versionMatches) {
    const prefix = match[1];
    const parts = prefix.split('/');
    if (parts.length >= 2) {
      const date = parts[1];
      const listFilesUrl = `https://${bucket.id}.${bucket.endpoint}/?prefix=${encodeURIComponent(prefix)}`;
      const signedFiles = await client.sign(listFilesUrl, { method: 'GET' });
      const filesRes = await fetch(signedFiles.url, { headers: signedFiles.headers });
      const filesXml = await filesRes.text();
      const fileMatches = [...filesXml.matchAll(/<Key>(.*?)<\/Key>/g)];
      const files = fileMatches.map(m => m[1].replace(prefix, '')).filter(f => f);
      versions.push({ date, files });
    }
  }
  return versions;
}