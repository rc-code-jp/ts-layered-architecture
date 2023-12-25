import { ITaskRepository } from '@/application/repositories/ITaskRepository';
import { TaskModel } from '@/domain/models/TaskModel';

export class DeleteTask {
  constructor(private repository: ITaskRepository) {}

  execute(params: { userId: number; taskGroupId: number }) {
    return this.repository.delete({ userId: params.userId, taskGroupId: params.taskGroupId });
  }
}
