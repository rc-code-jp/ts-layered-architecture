import { db } from '@/lib/database';
import { z } from '@/lib/zod';
import { invalidResponse, jsonResponse, notFoundResponse } from '@/utils';
import { zValidator } from '@hono/zod-validator';
import { createFactory } from 'hono/factory';

const factory = createFactory();

const validationParams = {
  name: z.string().max(50),
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
 * タスクグループ更新
 */
const handlers = factory.createHandlers(validation, async (c) => {
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
