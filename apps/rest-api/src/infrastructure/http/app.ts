import { authRoute } from '@/infrastructure/http/routes/auth';
import { taskGroupsRoute } from '@/infrastructure/http/routes/taskGroups';
import { tasksRoute } from '@/infrastructure/http/routes/tasks';
import { errorResponse, successResponse } from '@/infrastructure/http/utils/responses';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

const app = new Hono<{
  Variables: {
    userId: number;
  };
}>();

// ログ
app.use('*', logger());

// CORS
app.use(
  '*',
  cors({
    origin: ['http://localhost:4000'],
  }),
);

// ルート
app.get('/hc', (_c) => successResponse(''));

app.route('/auth', authRoute);
app.route('/task-groups', taskGroupsRoute);
app.route('/tasks', tasksRoute);

// エラーハンドリング
app.onError((err, _c) => {
  console.error(err);
  return errorResponse();
});

export { app };
