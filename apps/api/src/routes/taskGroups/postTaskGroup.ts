import { db } from '@/lib/database';
import { z } from '@/lib/zod';
import { invalidResponse, jsonResponse } from '@/utils';
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
 * タスクグループ作成
 */
const handlers = factory.createHandlers(logger(), validation, async (c) => {
  const body = c.req.valid('json');
  const item = await db.taskGroup.create({
    data: {
      userId: 1,
      name: body.name,
    },
  });

  return jsonResponse(
    JSON.stringify({
      item: item,
    }),
  );
});

export const postTaskGroup = handlers;
