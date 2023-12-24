import { ITaskRepository } from '@/application/repositories/ITaskRepository';
import { TaskModel } from '@/domain/models/TaskModel';

export class DeleteTask {
  constructor(private repository: ITaskRepository) {}

  execute(params: TaskModel) {
    return this.repository.delete(params);
  }
}
