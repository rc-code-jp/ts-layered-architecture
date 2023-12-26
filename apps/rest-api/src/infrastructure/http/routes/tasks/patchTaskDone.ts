import { jsonResponse, notFoundResponse } from '@/infrastructure/http/responses';
import { patchDoneValidation } from '@/infrastructure/http/validators/tasks';
import { TaskController } from '@/interfaces/controllers/TaskController';
import { createFactory } from 'hono/factory';

const factory = createFactory();

/**
 * タスクの完了状態を変更
 */
export const patchTaskDone = factory.createHandlers(patchDoneValidation, async (c) => {
  const { taskId } = c.req.param();
  const body = c.req.valid('json');
  const userId = c.get('userId');

  const taskController = new TaskController();
  const res = await taskController.updateTaskDone({
    id: Number(taskId),
    userId: userId,
    done: body.done,
  });

  if (!res) return notFoundResponse();

  return jsonResponse(
    JSON.stringify({
      id: res,
    }),
  );
});
