import { ITaskGroupRepository } from '@/application/repositories/ITaskGroupRepository';

export class UpdateTaskGroup {
  constructor(private repository: ITaskGroupRepository) {}

  async execute(params: {
    userId: number;
    taskGroupId: number;
    name?: string;
    sort?: number;
  }) {
    const model = await this.repository.findOne({
      id: params.taskGroupId,
      userId: params.userId,
    });
    if (!model) {
      throw new Error('TaskGroup not found');
    }

    Object.assign(model, params);

    return await this.repository.save({ item: model });
  }
}
