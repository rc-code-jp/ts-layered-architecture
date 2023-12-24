import { jsonResponse } from '@/infrastructure/http/responses';
import { TaskController } from '@/interfaces/controllers/TaskController';
import { createFactory } from 'hono/factory';

const factory = createFactory();

/**
 * タスクを削除する
 */
const handlers = factory.createHandlers(async (c) => {
  const { taskId } = c.req.param();
  const userId = c.get('userId');

  const taskController = new TaskController();
  const res = await taskController.deleteTask({
    id: Number(taskId),
    userId: userId,
  });

  return jsonResponse(
    JSON.stringify({
      id: res,
    }),
  );
});

export const deleteTask = handlers;
