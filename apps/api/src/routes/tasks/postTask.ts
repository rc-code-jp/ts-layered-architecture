import { db } from '@/lib/database';
import { z } from '@/lib/zod';
import { invalidResponse, jsonResponse, notFoundResponse } from '@/utils';
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
      taskGroupId: z.number(),
      title: z.string().max(200),
      dueDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/)
        .nullish(), // YYYY-MM-DD
      dueTime: z
        .string()
        .regex(/^\d{2}:\d{2}:\d{2}$/)
        .nullish(), // HH:MM:SS
      description: z.string().max(250).nullish(),
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

  const taskGroup = await db.taskGroup.findFirst({
    where: {
      id: { equals: body.taskGroupId },
      userId: 1,
    },
  });

  if (!taskGroup) {
    return notFoundResponse();
  }

  const item = await db.task.create({
    data: {
      taskGroupId: body.taskGroupId,
      title: body.title,
      description: body.description,
      dueDate: body.dueDate,
      dueTime: body.dueTime,
    },
  });

  return jsonResponse(
    JSON.stringify({
      item: item,
    }),
  );
});

export const postTaskHandlers = handlers;
