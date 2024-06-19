import { TaskGroupController } from '@/interfaces/controllers/TaskGroupController';
import { notFoundResponse, successResponse } from '@/interfaces/http/utils/responses';

import { createFactory } from 'hono/factory';

const factory = createFactory();

/**
 * タスクグループ詳細取得
 */
export const getTaskGroup = factory.createHandlers(async (c) => {
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
