import { ITaskRepository } from '@/application/repositories/ITaskRepository';
import { TaskModel } from '@/domain/models/TaskModel';

export class CreateTask {
  constructor(private repository: ITaskRepository) {}

  async execute(params: Omit<TaskModel, 'id' | 'done' | 'sort'> & { userId: number }) {
    const maxSort = await this.repository.findMaxSort({
      taskGroupId: params.taskGroupId,
      userId: params.userId,
    });

    const model = new TaskModel({
      id: 0,
      taskGroupId: params.taskGroupId,
      title: params.title,
      dueDate: params.dueDate,
      dueTime: params.dueTime,
      description: params.description,
      sort: Math.floor(maxSort) + TaskModel.INITIAL_SORT_VALUE,
    });
    return await this.repository.save({ item: model });
  }
}
