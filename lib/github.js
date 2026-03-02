// lib/github.js
// GitHub API 封装：搜索仓库、检查 releases

export async function checkGitHubHasReleases(owner, repo) {
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

export async function searchGitHub(query, page = 1, perPage = 10) {
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