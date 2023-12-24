import { ITaskRepository } from '@/application/repositories/ITaskRepository';
import { TaskModel } from '@/domain/models/TaskModel';

export class UpdateTask {
  constructor(private repository: ITaskRepository) {}

  execute(params: TaskModel) {
    const taskModel = new TaskModel({
      taskGroupId: params.props.taskGroupId,
      title: params.props.title,
      done: params.props.done,
      dueDate: params.props.dueDate,
      dueTime: params.props.dueTime,
      description: params.props.description,
      sort: 0,
    });
    return this.repository.save(taskModel);
  }
}
