import { db } from '@/lib/database';
import { jsonResponse, notFountResponse } from '@/utils';

import { createFactory } from 'hono/factory';
import { logger } from 'hono/logger';

const factory = createFactory();

/**
 * タスクグループ詳細取得
 */
const handlers = factory.createHandlers(logger(), async (c) => {
  const { id } = c.req.param();

  const item = await db.taskGroup.findFirst({
    where: {
      id: { equals: Number(id) },
    },
    include: {
      tasks: true,
    },
  });

  if (!item) return notFountResponse();

  return jsonResponse(
    JSON.stringify({
      item: item,
    }),
  );
});

export const getTaskGroupOneHandlers = handlers;
