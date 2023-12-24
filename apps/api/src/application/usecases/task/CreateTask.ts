import { ITaskRepository } from '@/application/repositries/ITaskRepository';
import { TaskModel } from '@/domain/models/TaskModel';

export class CreateTask {
  constructor(private repository: ITaskRepository) {}

  execute(params: TaskModel) {
    const taskModel = new TaskModel({
      taskGroupId: params.props.taskGroupId,
      title: params.props.title,
      done: false,
      dueDate: params.props.dueDate,
      dueTime: params.props.dueTime,
      description: params.props.description,
    });
    return this.repository.save(taskModel);
  }
}
