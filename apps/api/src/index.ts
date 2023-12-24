import { taskGroupsRoute } from '@/infrastructure/routes/taskGroups';
import { tasksRoute } from '@/infrastructure/routes/tasks';
import { jsonResponse } from '@/utils';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { logger } from 'hono/logger';

const app = new Hono<{
  Variables: {
    userId: number;
  };
}>();

// ログ
app.use('*', logger());

// ルート
app.get('/hc', (_c) => jsonResponse(''));

// ログ
app.use('*', async (c, next) => {
  c.set('userId', 1);
  await next();
});

app.route('/task-groups', taskGroupsRoute);
app.route('/tasks', tasksRoute);

// エラーハンドリング
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  console.error(err);
  return c.text('internal server error', 500);
});

// 起動
serve(app);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log('Server running http://localhost:3000/api');
