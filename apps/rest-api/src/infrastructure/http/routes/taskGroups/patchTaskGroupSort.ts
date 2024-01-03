import { notFoundResponse, successResponse } from '@/infrastructure/http/utils/responses';
import { patchSortValidation } from '@/infrastructure/http/validators/taskGroups';
import { TaskGroupController } from '@/interfaces/controllers/TaskGroupController';
import { createFactory } from 'hono/factory';

const factory = createFactory();

/**
 * タスクグループを更新
 */
export const patchTaskGroupSort = factory.createHandlers(patchSortValidation, async (c) => {
  const { taskGroupId } = c.req.param();
  const body = c.req.valid('json');
  const userId = c.get('userId');

  const taskGroupController = new TaskGroupController();
  const res = await taskGroupController.updateTaskGroupSort({
    id: Number(taskGroupId),
    userId: userId,
    prevId: body.prevId,
    nextId: body.nextId,
  });

  if (!res) return notFoundResponse();

  return successResponse(
    JSON.stringify({
      id: res,
    }),
  );
});
