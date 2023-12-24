import { jsonResponse } from '@/infrastructure/http/responses';
import { taskGroupsRoute } from '@/infrastructure/http/routes/taskGroups';
import { tasksRoute } from '@/infrastructure/http/routes/tasks';
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

export { app };
