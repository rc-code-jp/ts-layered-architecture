import { notFoundResponse, successResponse } from '@/infrastructure/http/utils/responses';
import { TaskGroupController } from '@/interfaces/controllers/TaskGroupController';

import { createFactory } from 'hono/factory';

const factory = createFactory();

/**
 * タスクグループ詳細取得
 */
export const getTaskGroupOne = factory.createHandlers(async (c) => {
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

  return successResponse(
    JSON.stringify({
      item: res,
    }),
  );
});
