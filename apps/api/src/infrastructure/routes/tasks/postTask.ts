import { CreateTask } from '@/application/usecases/task/CreateTask';
import { GetTaskGroup } from '@/application/usecases/taskGroup/GetTaskGroup';
import { TaskGroupRepository } from '@/interfaces/database/TaskGroupRepository';
import { TaskRepository } from '@/interfaces/database/TaskRepository';
import { z } from '@/lib/zod';
import { invalidResponse, jsonResponse, notFoundResponse } from '@/utils';
import { zValidator } from '@hono/zod-validator';
import { createFactory } from 'hono/factory';

const factory = createFactory();

// YYYY-MM-DD
const dateRegex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

// HH:MM:SS
const timeRegex = /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;

const validationParams = {
  taskGroupId: z.number(),
  title: z.string().max(200),
  dueDate: z.string().regex(dateRegex).optional(),
  dueTime: z.string().regex(timeRegex).optional(),
  description: z.string().max(250).optional(),
};

/**
 * バリデーションミドルウェア
 */
const validation = factory.createMiddleware(
  zValidator('json', z.object(validationParams), (result) => {
    if (!result.success) return invalidResponse(result.error.issues);
  }),
);

/**
 * タスク作成
 */
const handlers = factory.createHandlers(validation, async (c) => {
  const body = c.req.valid('json');

  const userId = c.get('userId');

  const getTaskGroup = new GetTaskGroup(new TaskGroupRepository());
  const taskGroup = await getTaskGroup.execute(body.taskGroupId, userId);

  if (!taskGroup) {
    return notFoundResponse();
  }

  const createTask = new CreateTask(new TaskRepository());
  const item = await createTask.execute({
    props: {
      taskGroupId: body.taskGroupId,
      title: body.title,
      description: body.description,
      dueDate: body.dueDate,
      dueTime: body.dueTime,
    },
  });

  return jsonResponse(
    JSON.stringify({
      id: item.props.id,
    }),
  );
});

export const postTask = handlers;
