import { jsonResponse } from '@/infrastructure/http/responses';
import { postValidation } from '@/infrastructure/http/validators/taskGroups';
import { TaskGroupController } from '@/interfaces/controllers/TaskGroupController';
import { createFactory } from 'hono/factory';

const factory = createFactory();

/**
 * タスクグループ作成
 */
const handlers = factory.createHandlers(postValidation, async (c) => {
  const body = c.req.valid('json');
  const userId = c.get('userId');

  const taskGroupController = new TaskGroupController();
  const res = await taskGroupController.createTaskGroup({
    userId,
    name: body.name,
  });

  return jsonResponse(
    JSON.stringify({
      id: res,
    }),
  );
});

export const postTaskGroup = handlers;
