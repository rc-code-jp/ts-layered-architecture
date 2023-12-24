import { ITaskRepository } from '@/application/repositories/ITaskRepository';
import { TaskModel } from '@/domain/models/TaskModel';
import { db } from '@/infrastructure/store/database/db';

export class TaskRepository implements ITaskRepository {
  async findOne(id: number, userId: number): Promise<TaskModel | null> {
    const item = await db.task.findFirst({
      where: { id, taskGroup: { userId } },
    });
    if (!item) return null;

    const model = new TaskModel({
      id: item.id,
      taskGroupId: item.taskGroupId,
      title: item.title,
      description: item.description ?? undefined,
      dueDate: item.dueDate ?? undefined,
      dueTime: item.dueTime ?? undefined,
      done: item.done,
      sort: item.sort,
    });
    return model;
  }

  async save(item: TaskModel): Promise<TaskModel> {
    if (item.props.id) {
      await db.task.update({
        where: { id: item.props.id },
        data: {
          title: item.props.title,
          description: item.props.description,
          dueDate: item.props.dueDate,
          dueTime: item.props.dueTime,
          done: item.props.done,
          sort: item.props.sort,
        },
      });
    } else {
      const res = await db.task.create({
        data: {
          title: item.props.title,
          taskGroupId: item.props.taskGroupId,
          description: item.props.description,
          dueDate: item.props.dueDate,
          dueTime: item.props.dueTime,
          done: item.props.done,
          sort: item.props.sort,
        },
      });
      item.props.id = res.id;
    }

    return item;
  }

  async delete(item: TaskModel): Promise<TaskModel> {
    await db.task.delete({
      where: {
        id: item.props.id,
      },
    });

    return item;
  }

  async deleteDone(userId: number, taskGroupId?: number): Promise<number> {
    const res = await db.task.deleteMany({
      where: {
        done: true,
        taskGroup: { userId },
        ...(taskGroupId ? { taskGroupId } : {}),
      },
    });

    return res.count;
  }
}
