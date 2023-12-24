import { jsonResponse } from '@/infrastructure/http/responses';
import { TaskGroupController } from '@/interfaces/controllers/TaskGroupController';
import { createFactory } from 'hono/factory';

const factory = createFactory();

/**
 * タスクグループを削除する
 */
const handlers = factory.createHandlers(async (c) => {
  const { taskGroupId } = c.req.param();

  const userId = c.get('userId');

  const taskGroupController = new TaskGroupController();
  const res = await taskGroupController.deleteTaskGroup({
    id: Number(taskGroupId),
    userId,
  });

  return jsonResponse(
    JSON.stringify({
      id: res,
    }),
  );
});

export const deleteTaskGroup = handlers;
