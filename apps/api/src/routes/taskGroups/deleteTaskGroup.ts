import { db } from '@/lib/database';
import { jsonResponse } from '@/utils';
import { createFactory } from 'hono/factory';


const factory = createFactory();

/**
 * タスクグループを削除する
 */
const handlers = factory.createHandlers(async (c) => {
  const { taskGroupId } = c.req.param();

  const tasks = await db.task.deleteMany({
    where: {
      taskGroupId: Number(taskGroupId),
      taskGroup: {
        userId: 1,
      },
    },
  });

  const taskGroup = await db.taskGroup.delete({
    where: {
      id: Number(taskGroupId),
      userId: 1,
    },
  });

  return jsonResponse(
    JSON.stringify({
      item: taskGroup,
    }),
  );
});

export const deleteTaskGroup = handlers;
