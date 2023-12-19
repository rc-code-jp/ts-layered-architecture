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
      done: z.boolean(),
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
  const { taskId } = c.req.param();
  const body = c.req.valid('json');

  const item = await db.task
    .update({
      where: {
        id: Number(taskId),
        taskGroup: {
          userId: 1,
        },
      },
      data: {
        done: body.done,
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

export const patchTaskDone = handlers;
