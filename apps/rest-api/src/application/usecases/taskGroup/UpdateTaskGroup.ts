import { ITaskGroupRepository } from '@/application/repositories/ITaskGroupRepository';
import { TaskGroupModel } from '@/domain/models/TaskGroupModel';

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

    // FIXME: ここでTaskGroupModelのプロパティを直接変更しているが、これは良くない
    Object.assign(model, params);

    return this.repository.save({ item: model });
  }
}
