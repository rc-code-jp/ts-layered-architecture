import { db } from '@/lib/database';
import { z } from '@/lib/zod';
import { invalidResponse, jsonResponse, notFountResponse } from '@/utils';
import { zValidator } from '@hono/zod-validator';
import { createFactory } from 'hono/factory';
import { logger } from 'hono/logger';

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
 * タスクの完了状態を変更
 */
const handlers = factory.createHandlers(logger(), validation, async (c) => {
  const body = c.req.valid('json');
  const item = await db.taskGroup.create({
    data: {
      name: body.name,
      userId: 1,
    },
  });

  if (!item) return notFountResponse();

  return jsonResponse(
    JSON.stringify({
      item: item,
    }),
  );
});

export const patchTaskDoneHandlers = handlers;
