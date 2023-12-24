import { jsonResponse, notFoundResponse } from '@/infrastructure/http/responses';
import { db } from '@/infrastructure/store/database/db';
import { createFactory } from 'hono/factory';
import { patchDoneValidation } from '../../validators/tasks';

const factory = createFactory();

/**
 * タスクの完了状態を変更
 */
const handlers = factory.createHandlers(patchDoneValidation, async (c) => {
  const { taskId } = c.req.param();
  const body = c.req.valid('json');
  const userId = c.get('userId');

  const item = await db.task
    .update({
      where: {
        id: Number(taskId),
        taskGroup: {
          userId: userId,
        },
      },
      data: {
        done: body.done,
      },
    })
    .catch(() => null);

  if (!item) return notFoundResponse();

  return jsonResponse(
    JSON.stringify({
      id: item.id,
    }),
  );
});

export const patchTaskDone = handlers;
