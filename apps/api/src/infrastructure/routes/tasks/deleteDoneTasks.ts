import { db } from '@/lib/database';
import { jsonResponse } from '@/utils';
import { createFactory } from 'hono/factory';


const factory = createFactory();

/**
 * 完了したタスクを削除する
 */
const handlers = factory.createHandlers(async (c) => {
  const { taskGroupId } = c.req.queries();

  const taskGroup = await db.task.deleteMany({
    where: {
      done: true,
      // グループIDがあれば指定する
      ...(taskGroupId ? { taskGroupId: Number(taskGroupId) } : {}),
    },
  });

  return jsonResponse(
    JSON.stringify({
      deleteCount: taskGroup.count,
    }),
  );
});

export const deleteDoneTasks = handlers;
