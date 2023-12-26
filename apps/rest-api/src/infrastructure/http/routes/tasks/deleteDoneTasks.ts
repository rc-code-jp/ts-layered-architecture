import { jsonResponse } from '@/infrastructure/http/responses';
import { TaskController } from '@/interfaces/controllers/TaskController';
import { createFactory } from 'hono/factory';

const factory = createFactory();

/**
 * 完了したタスクを削除する
 */
export const deleteDoneTasks = factory.createHandlers(async (c) => {
  const { taskGroupId } = c.req.queries();
  const userId = c.get('userId');

  const taskController = new TaskController();
  const res = await taskController.deleteDoneTasks({
    userId: userId,
    taskGroupId: taskGroupId ? Number(taskGroupId) : undefined,
  });

  return jsonResponse(
    JSON.stringify({
      count: res,
    }),
  );
});
