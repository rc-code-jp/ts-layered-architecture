import { ITaskRepository } from '@/application/repositories/ITaskRepository';

export class DeleteDoneTasks {
  constructor(private repository: ITaskRepository) {}

  execute(userId: number, taskGroupId?: number) {
    return this.repository.deleteDone(userId, taskGroupId);
  }
}
