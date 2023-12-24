import { jsonResponse } from '@/infrastructure/http/responses';
import { postValidation } from '@/infrastructure/http/validators/taskGroups';
import { db } from '@/infrastructure/store/database/db';
import { createFactory } from 'hono/factory';

const factory = createFactory();

/**
 * タスクグループ作成
 */
const handlers = factory.createHandlers(postValidation, async (c) => {
  const body = c.req.valid('json');
  const userId = c.get('userId');
  const item = await db.taskGroup.create({
    data: {
      userId: userId,
      name: body.name,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return jsonResponse(
    JSON.stringify({
      id: item.id,
    }),
  );
});

export const postTaskGroup = handlers;
