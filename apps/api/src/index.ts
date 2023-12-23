import { taskGroupsRoute } from '@/routes/taskGroups';
import { tasksRoute } from '@/routes/tasks';
import { jsonResponse } from '@/utils';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { logger } from 'hono/logger';

const api = new Hono().basePath('/api');

// ログ
api.use('*', logger());

/**
 * ヘルスチェック
 */
api.get('/hc', (_c) => jsonResponse(''));

/**
 * タスクグループ関連のルート
 */
api.route('/task-groups', taskGroupsRoute);

/**
 * タスク関連のルート
 */
api.route('/tasks', tasksRoute);

/**
 * エラーハンドリング
 */
api.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  console.error(err);
  return c.text('internal server error', 500);
});

/**
 * サーバー起動
 */
serve(api);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log('Server running http://localhost:3000/api');
