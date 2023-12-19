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
      name: z.string().max(200),
      dueDate: z.string().max(10), // YYYY-MM-DD
      dueTime: z.string().max(8), // HH:MM:SS
      description: z.string().max(250),
    }),
    (result) => {
      if (!result.success) return invalidResponse(result.error.issues);
    },
  ),
);

/**
 * タスク作成
 */
const handlers = factory.createHandlers(logger(), validation, async (c) => {
  const body = c.req.valid('json');
  const item = await db.task.create({
    data: {
      taskGroupId: 1,
      title: body.name,
      description: body.description,
      dueDate: body.dueDate,
      dueTime: body.dueTime,
    },
  });

  if (!item) return notFountResponse();

  return jsonResponse(
    JSON.stringify({
      item: item,
    }),
  );
});

export const postTaskHandlers = handlers;
