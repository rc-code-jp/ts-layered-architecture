import { jsonResponse } from '@/infrastructure/http/responses';
import { db } from '@/infrastructure/store/database/db';

import { createFactory } from 'hono/factory';

const factory = createFactory();

/**
 * タスクグループ一覧取得
 */
const handlers = factory.createHandlers(async () => {
  const list = await db.taskGroup.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return jsonResponse(
    JSON.stringify({
      list: list,
    }),
  );
});

export const getTaskGroups = handlers;
