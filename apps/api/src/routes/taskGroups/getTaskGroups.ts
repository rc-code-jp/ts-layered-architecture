import { db } from '@/lib/database';
import { jsonResponse } from '@/utils';

import { createFactory } from 'hono/factory';
import { logger } from 'hono/logger';

const factory = createFactory();

/**
 * タスクグループ一覧取得
 */
const handlers = factory.createHandlers(logger(), async () => {
  const list = await db.taskGroup.findMany();
  return jsonResponse(
    JSON.stringify({
      list: list,
    }),
  );
});

export const getTaskGroupsHandlers = handlers;
