import { jsonResponse, notFoundResponse } from '@/infrastructure/http/responses';
import { TaskGroupController } from '@/interfaces/controllers/TaskGroupController';

import { createFactory } from 'hono/factory';

const factory = createFactory();

/**
 * タスクグループ詳細取得
 */
const handlers = factory.createHandlers(async (c) => {
  const { taskGroupId } = c.req.param();
  const userId = c.get('userId');

  const taskGroupController = new TaskGroupController();
  const res = await taskGroupController.getTaskGroup({
    id: Number(taskGroupId),
    userId,
  });

  if (!res) {
    return notFoundResponse();
  }

  return jsonResponse(
    JSON.stringify({
      item: res,
    }),
  );
});

export const getTaskGroupOne = handlers;
