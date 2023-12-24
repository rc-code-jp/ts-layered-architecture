import { jsonResponse } from '@/infrastructure/http/responses';
import { TaskGroupController } from '@/interfaces/controllers/TaskGroupController';
import { createFactory } from 'hono/factory';

const factory = createFactory();

/**
 * タスクグループ一覧取得
 */
const handlers = factory.createHandlers(async (c) => {
  const userId = c.get('userId');

  const taskGroupController = new TaskGroupController();
  const list = await taskGroupController.getTaskGroupList({
    userId,
  });

  return jsonResponse(
    JSON.stringify({
      list: list,
    }),
  );
});

export const getTaskGroupList = handlers;
