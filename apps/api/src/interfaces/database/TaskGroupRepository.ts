import { ITaskGroupRepository } from '@/application/repositories/ITaskGroupRepository';
import { TaskGroupModel } from '@/domain/models/TaskGroupModel';
import { db } from '@/infrastructure/store/database/db';

export class TaskGroupRepository implements ITaskGroupRepository {
  async findAll(userId: number): Promise<TaskGroupModel[]> {
    const list = await db.taskGroup.findMany({
      select: {
        id: true,
        userId: true,
        name: true,
        sort: true,
      },
      where: {
        userId: userId,
      },
    });
    const models = list.map(
      (item) =>
        new TaskGroupModel({
          id: item.id,
          userId: item.userId,
          name: item.name,
          sort: item.sort,
        }),
    );
    return models;
  }

  async findOne(id: number, userId: number): Promise<TaskGroupModel | null> {
    const item = await db.taskGroup.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!item) return null;

    const model = new TaskGroupModel({
      id: item.id,
      userId: item.userId,
      name: item.name,
      sort: item.sort,
    });

    return model;
  }

  async save(item: TaskGroupModel): Promise<TaskGroupModel> {
    if (item.props.id) {
      await db.taskGroup.update({
        where: { id: item.props.id },
        data: {
          name: item.props.name,
          sort: item.props.sort,
        },
      });
    } else {
      const res = await db.taskGroup.create({
        data: {
          userId: item.props.userId,
          name: item.props.name,
          sort: item.props.sort,
        },
      });
      item.props.id = res.id;
    }
    return item;
  }

  async delete(item: TaskGroupModel): Promise<TaskGroupModel> {
    // 外部キー制約のため、先にタスクを削除する
    await db.task.deleteMany({
      where: {
        taskGroupId: item.props.id,
      },
    });

    await db.taskGroup.delete({
      where: {
        id: item.props.id,
      },
    });

    return item;
  }
}
