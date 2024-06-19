import { TaskController } from '@/interfaces/controllers/TaskController';
import { successResponse } from '@/interfaces/http/utils/responses';
import { createFactory } from 'hono/factory';

const factory = createFactory();

/**
 * タスクを削除する
 */
export const deleteTask = factory.createHandlers(async (c) => {
  const { taskId } = c.req.param();
  const userId = c.get('userId');

  const taskController = new TaskController();
  const res = await taskController.deleteTask({
    id: Number(taskId),
    userId: userId,
  });

  return successResponse(
    JSON.stringify({
      id: res,
    }),
  );
});
