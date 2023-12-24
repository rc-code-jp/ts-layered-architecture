import { jsonResponse, notFoundResponse } from '@/infrastructure/http/responses';
import { patchValidation } from '@/infrastructure/http/validators/taskGroups';
import { db } from '@/infrastructure/store/database/db';
import { createFactory } from 'hono/factory';

const factory = createFactory();

/**
 * タスクグループ更新
 */
const handlers = factory.createHandlers(patchValidation, async (c) => {
  const { taskGroupId } = c.req.param();
  const body = c.req.valid('json');
  const userId = c.get('userId');

  const item = await db.taskGroup
    .update({
      where: {
        id: Number(taskGroupId),
        userId: userId,
      },
      data: {
        name: body.name,
      },
      select: {
        id: true,
        name: true,
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

export const patchTaskGroup = handlers;
