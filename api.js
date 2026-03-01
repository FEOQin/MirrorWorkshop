// api.js
import { getJSON, putJSON, defaultGithubProjects, defaultDockerProjects, defaultBuckets, defaultConfig, fetchVersionsFromB2 } from './utils.js';

// 辅助函数：检查 GitHub 项目是否有 Releases
async function checkGitHubHasReleases(owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}/releases?per_page=1`;
  try {
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'B2-Mirror-Worker'
      }
    });
    if (!res.ok) return false;
    const data = await res.json();
    return Array.isArray(data) && data.length > 0;
  } catch {
    return false;
  }
}

// 辅助函数：检查 Docker 镜像是否有 Tags
async function checkDockerHasTags(repo) {
  const url = `https://hub.docker.com/v2/repositories/library/${repo}/tags/?page_size=1`;
  try {
    const res = await fetch(url, {
      headers: { 'Accept': 'application/json', 'User-Agent': 'B2-Mirror-Worker' }
    });
    if (!res.ok) return false;
    const data = await res.json();
    return data.results && data.results.length > 0;
  } catch {
    return false;
  }
}

// 搜索 GitHub
async function searchGitHub(query, page = 1, perPage = 10) {
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&page=${page}&per_page=${perPage}`;
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'B2-Mirror-Worker'
      }
    });
    if (!response.ok) {
      console.error(`GitHub API error ${response.status}: ${await response.text()}`);
      return { items: [], total: 0 };
    }
    const data = await response.json();
    const baseItems = data.items.map(item => ({
      name: item.full_name,
      description: item.description || '暂无描述',
      stars: item.stargazers_count,
      forks: item.forks_count,
      lastUpdate: item.pushed_at ? item.pushed_at.split('T')[0] : (item.updated_at ? item.updated_at.split('T')[0] : '未知'),
      homepage: item.html_url,
      type: 'github',
      owner: item.owner.login,
      repo: item.name
    }));

    const hasReleasesArray = await Promise.all(
      baseItems.map(item => checkGitHubHasReleases(item.owner, item.repo))
    );
    const items = baseItems.map((item, idx) => ({
      ...item,
      has_releases: hasReleasesArray[idx]
    }));

    return { items, total: data.total_count };
  } catch (error) {
    console.error('GitHub search error:', error);
    return { items: [], total: 0 };
  }
}

// 搜索 Docker Hub
async function searchDockerHub(query, page = 1, perPage = 10) {
  const url = `https://hub.docker.com/v2/repositories/library/${encodeURIComponent(query)}/?page=${page}&page_size=${perPage}`;
  try {
    let response = await fetch(url, {
      headers: { 'Accept': 'application/json', 'User-Agent': 'B2-Mirror-Worker' }
    });
    if (response.status === 401) {
      const authenticate = response.headers.get('www-authenticate') || '';
      const realmMatch = authenticate.match(/realm="([^"]+)"/);
      const serviceMatch = authenticate.match(/service="([^"]+)"/);
      const scopeMatch = authenticate.match(/scope="([^"]+)"/);
      if (realmMatch && serviceMatch) {
        const tokenUrl = `${realmMatch[1]}?service=${serviceMatch[1]}${scopeMatch ? '&scope=' + scopeMatch[1] : ''}`;
        const tokenRes = await fetch(tokenUrl);
        if (tokenRes.ok) {
          const tokenData = await tokenRes.json();
          response = await fetch(url, {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${tokenData.token}`,
              'User-Agent': 'B2-Mirror-Worker'
            }
          });
        }
      }
    }
    if (!response.ok) {
      console.error(`Docker Hub API error ${response.status}: ${await response.text()}`);
      return {
        items: [{
          name: `library/${query}`,
          description: '镜像名称',
          stars: 0,
          pulls: 0,
          lastUpdate: new Date().toISOString().split('T')[0],
          homepage: `https://hub.docker.com/_/${query}`,
          type: 'docker',
          repo: query,
          has_releases: false
        }],
        total: 1
      };
    }
    const data = await response.json();
    const results = data.results || [];
    const baseItems = results.map(item => ({
      name: `library/${item.name}`,
      description: item.description || '暂无描述',
      stars: item.star_count || 0,
      pulls: item.pull_count || 0,
      lastUpdate: item.last_updated ? item.last_updated.split('T')[0] : new Date().toISOString().split('T')[0],
      homepage: `https://hub.docker.com/_/${item.name}`,
      type: 'docker',
      repo: item.name
    }));

    const hasReleasesArray = await Promise.all(
      baseItems.map(item => checkDockerHasTags(item.repo))
    );
    const items = baseItems.map((item, idx) => ({
      ...item,
      has_releases: hasReleasesArray[idx]
    }));

    return { items, total: data.count || items.length };
  } catch (error) {
    console.error('Docker Hub search error:', error);
    return { items: [], total: 0 };
  }
}

// 处理 API 请求
export async function handleAPI(request, env) {
  const url = new URL(request.url);
  const method = request.method;
  const path = url.pathname.slice(5); // 去掉 '/api/'

  // 搜索 API
  if (path === 'search' && method === 'GET') {
    const query = url.searchParams.get('q');
    const type = url.searchParams.get('type') || 'github';
    const page = parseInt(url.searchParams.get('page')) || 1;
    const perPage = 10;
    if (!query) {
      return new Response(JSON.stringify({ error: 'Missing query' }), { status: 400 });
    }
    try {
      let result;
      if (type === 'github') {
        result = await searchGitHub(query, page, perPage);
      } else {
        result = await searchDockerHub(query, page, perPage);
      }
      return Response.json({
        items: result.items,
        total: result.total,
        page,
        perPage
      });
    } catch (error) {
      console.error('Search API error:', error);
      return new Response(JSON.stringify({ error: error.message, items: [], total: 0 }), { status: 500 });
    }
  }

  // 获取 GitHub 项目列表
  if (path === 'projects/github' && method === 'GET') {
    const projects = await getJSON(env.B2_KV, 'projects_github', defaultGithubProjects);
    return Response.json(projects);
  }

  // 获取 Docker 项目列表
  if (path === 'projects/docker' && method === 'GET') {
    const projects = await getJSON(env.B2_KV, 'projects_docker', defaultDockerProjects);
    return Response.json(projects);
  }

  // 保存项目
  if (path === 'project' && method === 'POST') {
    const { type, name, bucketId } = await request.json();
    const versions = await fetchVersionsFromB2(bucketId, name, env);
    const newProject = {
      name,
      lastUpdate: new Date().toISOString().slice(0,10),
      homepage: type === 'github' ? `https://github.com/${name}` : `https://hub.docker.com/_/${name.replace('library/', '')}`,
      bucketId,
      versions
    };
    const kvKey = type === 'github' ? 'projects_github' : 'projects_docker';
    const projects = await getJSON(env.B2_KV, kvKey, type === 'github' ? defaultGithubProjects : defaultDockerProjects);
    projects.push(newProject);
    await putJSON(env.B2_KV, kvKey, projects);
    return Response.json({ success: true });
  }

  // 获取桶列表
  if (path === 'buckets' && method === 'GET') {
    const buckets = await getJSON(env.B2_KV, 'buckets', defaultBuckets);
    return Response.json(buckets);
  }

  // 更新桶列表
  if (path === 'buckets' && method === 'POST') {
    const newBuckets = await request.json();
    await putJSON(env.B2_KV, 'buckets', newBuckets);
    return Response.json({ success: true });
  }

  // 获取配置
  if (path === 'config' && method === 'GET') {
    const config = await getJSON(env.B2_KV, 'config', defaultConfig);
    return Response.json(config);
  }

  // 更新配置
  if (path === 'config' && method === 'POST') {
    const newConfig = await request.json();
    await putJSON(env.B2_KV, 'config', newConfig);
    return Response.json({ success: true });
  }

  return new Response('API not found', { status: 404 });
}