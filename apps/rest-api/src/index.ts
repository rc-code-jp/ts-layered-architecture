import { app } from '@/infrastructure/http/app';
import { serve } from '@hono/node-server';

const SERVER_PORT = 3000;

// 起動
serve({
  fetch: app.fetch,
  port: SERVER_PORT,
});

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(`Server running http://localhost:${SERVER_PORT}/`);
