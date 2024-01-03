import { ITaskGroupRepository } from '@/application/repositories/ITaskGroupRepository';
import { TaskGroupModel } from '@/domain/models/TaskGroupModel';

export class UpdateTaskGroupSort {
  constructor(private repository: ITaskGroupRepository) {}

  async execute(params: {
    userId: number;
    taskGroupId: number;
    prevId?: number;
    nextId?: number;
  }) {
    const model = await this.repository.findOne({
      id: params.taskGroupId,
      userId: params.userId,
    });
    if (!model) {
      throw new Error('Task Group not found');
    }

    let prevModelSort = 0;
    if (params.prevId) {
      const prevModel = await this.repository.findOne({
        id: params.prevId,
        userId: params.userId,
      });
      if (!prevModel) {
        throw new Error('Task Group not found');
      }
      prevModelSort = prevModel.sort;
    }

    let nextModelSort = TaskGroupModel.INITIAL_SORT_VALUE;
    if (params.nextId) {
      const nextModel = await this.repository.findOne({
        id: params.nextId,
        userId: params.userId,
      });
      if (!nextModel) {
        throw new Error('Task Group not found');
      }
      nextModelSort = nextModel.sort;
    }

    Object.assign(model, {
      sort: (prevModelSort + nextModelSort) / 2,
    });

    return await this.repository.save({ item: model });
  }
}
