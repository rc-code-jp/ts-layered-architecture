import { ITaskRepository } from '@/application/repositories/ITaskRepository';

export class DeleteTask {
  constructor(private repository: ITaskRepository) {}

  async execute(params: { userId: number; taskId: number }) {
    const model = await this.repository.findOne({
      id: params.taskId,
      userId: params.userId,
    });
    if (!model) {
      throw new Error('Task not found');
    }
    return this.repository.delete({ item: model });
  }
}
