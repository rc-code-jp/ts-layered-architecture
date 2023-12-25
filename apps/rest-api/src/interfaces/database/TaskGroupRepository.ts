import { ITaskGroupRepository } from '@/application/repositories/ITaskGroupRepository';
import { TaskGroupModel } from '@/domain/models/TaskGroupModel';
import { db } from '@/infrastructure/store/database/db';

export class TaskGroupRepository implements ITaskGroupRepository {
  async findAll(params: { userId: number }): Promise<TaskGroupModel[]> {
    const list = await db.taskGroup.findMany({
      select: {
        id: true,
        userId: true,
        name: true,
        sort: true,
      },
      where: {
        userId: params.userId,
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

  async findOne(params: { id: number; userId: number }): Promise<TaskGroupModel | null> {
    const item = await db.taskGroup.findFirst({
      where: {
        id: params.id,
        userId: params.userId,
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

  async save(params: { item: TaskGroupModel }): Promise<TaskGroupModel> {
    const item = params.item;

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

  async delete(params: { item: TaskGroupModel }): Promise<number> {
    // 外部キー制約のため、先にタスクを削除する
    await db.task.deleteMany({
      where: {
        taskGroupId: params.item.props.id,
      },
    });

    const item = await db.taskGroup.delete({
      where: {
        id: params.item.props.id,
      },
    });

    return item.id;
  }
}
