import { db } from '@/lib/database';
import { jsonResponse } from '@/utils';
import { createFactory } from 'hono/factory';

const factory = createFactory();

/**
 * タスクグループを削除する
 */
const handlers = factory.createHandlers(async (c) => {
  const { taskGroupId } = c.req.param();

  const userId = c.get('userId');

  await db.task.deleteMany({
    where: {
      taskGroupId: Number(taskGroupId),
      taskGroup: {
        userId: userId,
      },
    },
  });

  const item = await db.taskGroup.delete({
    where: {
      id: Number(taskGroupId),
      userId: userId,
    },
  });

  return jsonResponse(
    JSON.stringify({
      id: item.id,
    }),
  );
});

export const deleteTaskGroup = handlers;
