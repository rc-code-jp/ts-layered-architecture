import { app } from '@/infrastructure/http/app';
import { serve } from '@hono/node-server';

const port = 3000;

// 起動
serve({
  fetch: app.fetch,
  port: 3000,
});

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(`Server running http://localhost:${port}/`);
