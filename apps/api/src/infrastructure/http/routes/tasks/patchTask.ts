import { jsonResponse, notFoundResponse } from '@/infrastructure/http/responses';
import { db } from '@/infrastructure/store/database/db';
import { createFactory } from 'hono/factory';
import { patchValidation } from '../../validators/tasks';

const factory = createFactory();

/**
 * タスクを更新
 */
const handlers = factory.createHandlers(patchValidation, async (c) => {
  const { taskId } = c.req.param();
  const body = c.req.valid('json');
  const userId = c.get('userId');

  const item = await db.task.update({
    where: {
      id: Number(taskId),
      taskGroup: {
        userId: userId,
      },
    },
    data: {
      title: body.title,
      description: body.description,
      dueDate: body.dueDate,
      dueTime: body.dueTime,
    },
  });

  if (!item) return notFoundResponse();

  return jsonResponse(
    JSON.stringify({
      id: item.id,
    }),
  );
});

export const patchTaskDone = handlers;
