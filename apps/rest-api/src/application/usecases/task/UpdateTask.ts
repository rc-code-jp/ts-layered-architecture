import { ITaskRepository } from '@/application/repositories/ITaskRepository';
import { TaskModel } from '@/domain/models/TaskModel';

export class UpdateTask {
  constructor(private repository: ITaskRepository) {}

  execute(params: TaskModel) {
    return this.repository.save({ item: params });
  }
}
