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
    });
    return model;
  }

  async save(task: TaskModel): Promise<TaskModel> {
    if (task.props.id) {
      await db.task.update({
        where: { id: task.props.id },
        data: {
          title: task.props.title,
          description: task.props.description,
          dueDate: task.props.dueDate,
          dueTime: task.props.dueTime,
          done: task.props.done,
        },
      });
    } else {
      const item = await db.task.create({
        data: {
          title: task.props.title,
          taskGroupId: task.props.taskGroupId,
          description: task.props.description,
          dueDate: task.props.dueDate,
          dueTime: task.props.dueTime,
          done: task.props.done,
        },
      });
      task.props.id = item.id;
    }

    return task;
  }

  delete(id: number): Promise<TaskModel> {
    throw new Error('Method not implemented.');
  }
}
