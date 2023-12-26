import { jsonResponse } from '@/infrastructure/http/responses';
import { patchValidation } from '@/infrastructure/http/validators/taskGroups';
import { TaskGroupController } from '@/interfaces/controllers/TaskGroupController';
import { createFactory } from 'hono/factory';

const factory = createFactory();

/**
 * タスクグループ更新
 */
export const patchTaskGroup = factory.createHandlers(patchValidation, async (c) => {
  const { taskGroupId } = c.req.param();
  const body = c.req.valid('json');
  const userId = c.get('userId');

  const taskGroupController = new TaskGroupController();
  const res = await taskGroupController.updateTaskGroup({
    id: Number(taskGroupId),
    userId,
    name: body.name,
  });

  return jsonResponse(
    JSON.stringify({
      id: res,
    }),
  );
});
