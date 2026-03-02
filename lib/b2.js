// lib/b2.js
// B2 辅助函数：提取 region、获取桶信息

import { getJSON, defaultBuckets } from './kv.js';
import { AwsClient } from '../aws4fetch.js';

export function extractRegionFromEndpoint(ep) {
  const match = ep.match(/^s3\.([\w-]+)\.backblazeb2\.com$/);
  return match ? match[1] : 'us-east-1';
}

// 从 B2 列出文件并解析版本（用于项目添加时扫描已有版本）
export async function fetchVersionsFromB2(bucketId, projectName, env) {
  const buckets = await getJSON(env.B2_KV, 'buckets', defaultBuckets);
  const bucket = buckets.find(b => b.id === bucketId);
  if (!bucket) throw new Error('Bucket not found');
  const { keyID, applicationKey, endpoint, bucketName } = bucket;
  const client = new AwsClient({
    accesskeyID: keyID,
    secretAccessKey: applicationKey,
    service: 's3',
    region: extractRegionFromEndpoint(endpoint)
  });
  // 使用 bucketName 构建 URL
  const listUrl = `https://${bucketName}.${endpoint}/?prefix=${encodeURIComponent(projectName)}/&delimiter=/`;
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
      const listFilesUrl = `https://${bucketName}.${endpoint}/?prefix=${encodeURIComponent(prefix)}`;
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
