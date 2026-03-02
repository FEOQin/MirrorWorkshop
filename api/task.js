// api/task.js
// 处理 /api/task/:id（查询任务状态）

export async function handleTask(request, env) {
  const url = new URL(request.url);
  const taskId = url.pathname.split('/').pop(); // /api/task/xxx
  // 先尝试获取主任务
  let task = await env.B2_KV.get(`master:${taskId}`, 'json');
  if (!task) {
    // 如果不是主任务，可能是个旧式任务（兼容）
    task = await env.B2_KV.get(`task:${taskId}`, 'json');
  }
  if (!task) {
    return new Response(JSON.stringify({ error: 'Task not found' }), { status: 404 });
  }
  return Response.json(task);
}