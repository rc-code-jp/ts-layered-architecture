import { equal } from 'assert';
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
      title: z.string().max(200),
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
 * タスクを更新
 */
const handlers = factory.createHandlers(logger(), validation, async (c) => {
  const { taskId } = c.req.param();
  const body = c.req.valid('json');

  const item = await db.task.update({
    where: {
      id: Number(taskId),
      taskGroup: {
        userId: 1,
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
      item: item,
    }),
  );
});

export const patchTaskDone = handlers;
