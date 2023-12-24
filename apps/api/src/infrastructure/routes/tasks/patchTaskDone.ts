import { equal } from 'assert';
import { db } from '@/lib/database';
import { z } from '@/lib/zod';
import { invalidResponse, jsonResponse, notFoundResponse } from '@/utils';
import { zValidator } from '@hono/zod-validator';
import { createFactory } from 'hono/factory';

const factory = createFactory();

const validationParams = {
  done: z.boolean(),
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
 * タスクの完了状態を変更
 */
const handlers = factory.createHandlers(validation, async (c) => {
  const { taskId } = c.req.param();
  const body = c.req.valid('json');
  const userId = c.get('userId');

  const item = await db.task
    .update({
      where: {
        id: Number(taskId),
        taskGroup: {
          userId: userId,
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
      id: item.id,
    }),
  );
});

export const patchTaskDone = handlers;
