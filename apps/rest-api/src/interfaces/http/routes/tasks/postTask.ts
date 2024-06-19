import { TaskController } from '@/interfaces/controllers/TaskController';
import { successResponse } from '@/interfaces/http/utils/responses';
import { postValidation } from '@/interfaces/http/validators/tasks';
import { createFactory } from 'hono/factory';

const factory = createFactory();

/**
 * タスク作成
 */
export const postTask = factory.createHandlers(postValidation, async (c) => {
  const body = c.req.valid('json');
  const userId = c.get('userId');

  const taskController = new TaskController();
  const res = await taskController.createTask({
    userId: userId,
    taskGroupId: body.taskGroupId,
    title: body.title,
    description: body.description,
    dueDate: body.dueDate,
    dueTime: body.dueTime,
  });

  return successResponse(
    JSON.stringify({
      id: res,
    }),
  );
});
