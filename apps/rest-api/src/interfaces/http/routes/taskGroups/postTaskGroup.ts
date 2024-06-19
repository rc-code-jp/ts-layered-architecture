import { TaskGroupController } from '@/interfaces/controllers/TaskGroupController';
import { successResponse } from '@/interfaces/http/utils/responses';
import { postValidation } from '@/interfaces/http/validators/taskGroups';
import { createFactory } from 'hono/factory';

const factory = createFactory();

/**
 * タスクグループ作成
 */
export const postTaskGroup = factory.createHandlers(postValidation, async (c) => {
  const body = c.req.valid('json');
  const userId = c.get('userId');

  const taskGroupController = new TaskGroupController();
  const res = await taskGroupController.createTaskGroup({
    userId,
    name: body.name,
  });

  return successResponse(
    JSON.stringify({
      id: res,
    }),
  );
});
