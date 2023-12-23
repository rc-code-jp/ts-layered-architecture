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
      taskGroupId: z.number(),
      title: z.string().max(200),
      dueDate: z.string().regex(dateRegex).nullish(),
      dueTime: z.string().regex(timeRegex).nullish(),
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
const handlers = factory.createHandlers(validation, async (c) => {
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
