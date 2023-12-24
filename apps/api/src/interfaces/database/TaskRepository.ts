import { ITaskRepository } from '@/application/repositries/ITaskRepository';
import { TaskModel } from '@/domain/models/TaskModel';
import { db } from '@/lib/database';

export class TaskRepository implements ITaskRepository {
  findAll(userId: number): Promise<TaskModel[]> {
    throw new Error('Method not implemented.');
  }

  findOne(id: number, userId: number): Promise<TaskModel> {
    throw new Error('Method not implemented.');
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
