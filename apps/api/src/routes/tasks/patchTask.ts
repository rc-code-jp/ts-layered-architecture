import { equal } from 'assert';
import { db } from '@/lib/database';
import { z } from '@/lib/zod';
import { invalidResponse, jsonResponse, notFoundResponse } from '@/utils';
import { zValidator } from '@hono/zod-validator';
import { createFactory } from 'hono/factory';

const factory = createFactory();

// YYYY-MM-DD
const dateRegex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

// HH:MM:SS
const timeRegex = /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;

/**
 * バリデーションミドルウェア
 */
const validation = factory.createMiddleware(
  zValidator(
    'json',
    z.object({
      title: z.string().max(200),
      dueDate: z.string().regex(dateRegex).nullish(), // YYYY-MM-DD
      dueTime: z.string().regex(timeRegex).nullish(), // HH:MM:SS
      description: z.string().max(250).nullish(),
    }),
    (result) => {
      if (!result.success) return invalidResponse(result.error.issues);
    },
  ),
);

/**
 * タスクを更新
 */
const handlers = factory.createHandlers(validation, async (c) => {
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
