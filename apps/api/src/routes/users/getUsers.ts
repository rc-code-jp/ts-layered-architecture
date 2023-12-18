import { db } from '@/lib/database';
import { jsonResponse } from '@/utils';

import { createFactory } from 'hono/factory';
import { logger } from 'hono/logger';

const factory = createFactory();

/**
 * ユーザー一覧取得
 */
const handlers = factory.createHandlers(logger(), async () => {
  const users = await db.user.findMany();
  return jsonResponse(
    JSON.stringify({
      list: users,
    }),
  );
});

export const getUsersHandlers = handlers;
