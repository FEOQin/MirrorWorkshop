// index.js
import { handleAPI } from './api.js';
import { renderHomePage } from './html.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) {
      return handleAPI(request, env);
    }
    return new Response(renderHomePage(), {
      headers: { 'Content-Type': 'text/html;charset=UTF-8' }
    });
  }
};