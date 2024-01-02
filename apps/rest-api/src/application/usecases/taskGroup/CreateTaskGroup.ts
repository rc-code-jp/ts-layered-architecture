import { ITaskGroupRepository } from '@/application/repositories/ITaskGroupRepository';
import { TaskGroupModel } from '@/domain/models/TaskGroupModel';

export class CreateTaskGroup {
  constructor(private repository: ITaskGroupRepository) {}

  private INITIAL_SORT_VALUE = 65535;

  async execute(params: Omit<TaskGroupModel, 'id' | 'sort'>) {
    const maxSort = await this.repository.findMaxSort({ userId: params.userId });

    const model = new TaskGroupModel({
      id: 0,
      name: params.name,
      userId: params.userId,
      sort: Math.floor(maxSort) + this.INITIAL_SORT_VALUE,
    });
    return await this.repository.save({ item: model });
  }
}
