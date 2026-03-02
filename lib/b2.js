// lib/b2.js
// B2 辅助函数：提取 region、获取桶信息

export function extractRegionFromEndpoint(ep) {
  const match = ep.match(/^s3\.([\w-]+)\.backblazeb2\.com$/);
  return match ? match[1] : 'us-east-1';
}