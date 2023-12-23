import { db } from '@/lib/database';
import { jsonResponse } from '@/utils';

import { createFactory } from 'hono/factory';


const factory = createFactory();

/**
 * タスクグループ一覧取得
 */
const handlers = factory.createHandlers(async () => {
  const list = await db.taskGroup.findMany();
  return jsonResponse(
    JSON.stringify({
      list: list,
    }),
  );
});

export const getTaskGroupsHandlers = handlers;
