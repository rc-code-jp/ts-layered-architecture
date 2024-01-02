import { notFoundResponse, successResponse } from '@/infrastructure/http/utils/responses';
import { patchSortValidation } from '@/infrastructure/http/validators/tasks';
import { TaskController } from '@/interfaces/controllers/TaskController';
import { createFactory } from 'hono/factory';

const factory = createFactory();

/**
 * タスクを更新
 */
export const patchTaskSort = factory.createHandlers(patchSortValidation, async (c) => {
  const { taskId } = c.req.param();
  const body = c.req.valid('json');
  const userId = c.get('userId');

  const taskController = new TaskController();
  const res = await taskController.updateTaskSort({
    id: Number(taskId),
    userId: userId,
    prevTaskId: body.prevTaskId,
    nextTaskId: body.nextTaskId,
  });

  if (!res) return notFoundResponse();

  return successResponse(
    JSON.stringify({
      id: res,
    }),
  );
});
