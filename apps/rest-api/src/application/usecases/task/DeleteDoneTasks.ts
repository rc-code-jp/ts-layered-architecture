import { ITaskRepository } from '@/application/repositories/ITaskRepository';

export class DeleteDoneTasks {
  constructor(private repository: ITaskRepository) {}

  execute(params: { userId: number; taskGroupId?: number }) {
    return this.repository.deleteDone({
      userId: params.userId,
      taskGroupId: params.taskGroupId,
    });
  }
}
