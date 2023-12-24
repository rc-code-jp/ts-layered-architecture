import { db } from '@/lib/database';
import { jsonResponse, notFoundResponse } from '@/utils';

import { createFactory } from 'hono/factory';

const factory = createFactory();

/**
 * タスクグループ詳細取得
 */
const handlers = factory.createHandlers(async (c) => {
  const { taskGroupId } = c.req.param();

  const item = await db.taskGroup.findFirst({
    where: {
      id: { equals: Number(taskGroupId) },
    },
    select: {
      id: true,
      name: true,
      tasks: {
        select: {
          id: true,
          taskGroupId: true,
          title: true,
          description: true,
          dueDate: true,
          dueTime: true,
          done: true,
        },
      },
    },
  });

  if (!item) return notFoundResponse();

  return jsonResponse(
    JSON.stringify({
      item: item,
    }),
  );
});

export const getTaskGroupOne = handlers;
