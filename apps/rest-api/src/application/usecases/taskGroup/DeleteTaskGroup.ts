import { ITaskGroupRepository } from '@/application/repositories/ITaskGroupRepository';

export class DeleteTaskGroup {
  constructor(private repository: ITaskGroupRepository) {}

  async execute(params: { userId: number; taskGroupId: number }) {
    const model = await this.repository.findOne({
      id: params.taskGroupId,
      userId: params.userId,
    });
    if (!model) {
      throw new Error('TaskGroup not found');
    }
    return await this.repository.delete({ item: model });
  }
}
