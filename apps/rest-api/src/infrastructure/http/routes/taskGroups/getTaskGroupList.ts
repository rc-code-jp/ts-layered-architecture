import { successResponse } from '@/infrastructure/http/utils/responses';
import { TaskGroupController } from '@/interfaces/controllers/TaskGroupController';
import { createFactory } from 'hono/factory';

const factory = createFactory();

/**
 * タスクグループ一覧取得
 */
export const getTaskGroupList = factory.createHandlers(async (c) => {
  const userId = c.get('userId');

  const taskGroupController = new TaskGroupController();
  const list = await taskGroupController.getTaskGroupList({
    userId,
  });

  return successResponse(
    JSON.stringify({
      list: list,
    }),
  );
});
