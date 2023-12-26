import { jsonResponse, notFoundResponse } from '@/infrastructure/http/utils/responses';
import { patchValidation } from '@/infrastructure/http/validators/tasks';
import { TaskController } from '@/interfaces/controllers/TaskController';
import { createFactory } from 'hono/factory';

const factory = createFactory();

/**
 * タスクを更新
 */
export const patchTask = factory.createHandlers(patchValidation, async (c) => {
  const { taskId } = c.req.param();
  const body = c.req.valid('json');
  const userId = c.get('userId');

  const taskController = new TaskController();
  const res = await taskController.updateTask({
    id: Number(taskId),
    userId: userId,
    title: body.title,
    description: body.description,
    dueDate: body.dueDate,
    dueTime: body.dueTime,
  });

  if (!res) return notFoundResponse();

  return jsonResponse(
    JSON.stringify({
      id: res,
    }),
  );
});
