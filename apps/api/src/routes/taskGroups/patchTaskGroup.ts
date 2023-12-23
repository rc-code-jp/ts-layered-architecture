import { db } from '@/lib/database';
import { z } from '@/lib/zod';
import { invalidResponse, jsonResponse, notFoundResponse } from '@/utils';
import { zValidator } from '@hono/zod-validator';
import { createFactory } from 'hono/factory';

const factory = createFactory();

/**
 * バリデーションミドルウェア
 */
const validation = factory.createMiddleware(
  zValidator(
    'json',
    z.object({
      name: z.string().max(50),
    }),
    (result) => {
      if (!result.success) return invalidResponse(result.error.issues);
    },
  ),
);

/**
 * タスクグループ更新
 */
const handlers = factory.createHandlers(validation, async (c) => {
  const { taskGroupId } = c.req.param();
  const body = c.req.valid('json');

  const item = await db.taskGroup
    .update({
      where: {
        id: Number(taskGroupId),
        userId: 1,
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
      item: item,
    }),
  );
});

export const patchTaskGroup = handlers;
