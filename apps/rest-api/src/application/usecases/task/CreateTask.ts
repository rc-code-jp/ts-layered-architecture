import { ITaskRepository } from '@/application/repositories/ITaskRepository';
import { TaskModel } from '@/domain/models/TaskModel';

export class CreateTask {
  constructor(private repository: ITaskRepository) {}

  execute(params: TaskModel) {
    const model = new TaskModel({
      taskGroupId: params.props.taskGroupId,
      title: params.props.title,
      done: false,
      dueDate: params.props.dueDate,
      dueTime: params.props.dueTime,
      description: params.props.description,
      sort: params.props.sort,
    });
    return this.repository.save({ item: model });
  }
}
