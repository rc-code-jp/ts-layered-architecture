import { db } from '@/lib/database';
import { jsonResponse, notFountResponse } from '@/utils';

import { createFactory } from 'hono/factory';
import { logger } from 'hono/logger';

const factory = createFactory();

/**
 * ユーザー詳細取得
 */
const handlers = factory.createHandlers(logger(), async (c) => {
  const { id } = c.req.param();
  console.dir(c.req.param());
  const user = await db.user.findFirst({
    where: {
      id: { equals: Number(id) },
    },
  });

  if (!user) return notFountResponse();

  return jsonResponse(
    JSON.stringify({
      item: user,
    }),
  );
});

export const getUserOneHandlers = handlers;
