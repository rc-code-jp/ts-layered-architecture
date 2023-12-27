import { ITaskRepository } from '@/application/repositories/ITaskRepository';
import { TaskModel } from '@/domain/models/TaskModel';

export class CreateTask {
  constructor(private repository: ITaskRepository) {}

  execute(params: TaskModel) {
    const model = new TaskModel({
      taskGroupId: params.taskGroupId,
      title: params.title,
      done: false,
      dueDate: params.dueDate,
      dueTime: params.dueTime,
      description: params.description,
      sort: params.sort,
    });
    return this.repository.save({ item: model });
  }
}
