import { ITaskRepository } from '@/application/repositories/ITaskRepository';

export class DeleteDoneTasks {
  constructor(private repository: ITaskRepository) {}

  async execute(params: { userId: number; taskGroupId?: number }) {
    return await this.repository.deleteDone({
      userId: params.userId,
      taskGroupId: params.taskGroupId,
    });
  }
}
