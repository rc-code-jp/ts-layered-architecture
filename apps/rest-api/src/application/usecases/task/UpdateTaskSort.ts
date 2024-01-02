import { ITaskRepository } from '@/application/repositories/ITaskRepository';
import { TaskModel } from '@/domain/models/TaskModel';

export class UpdateTaskSort {
  constructor(private repository: ITaskRepository) {}

  async execute(params: {
    userId: number;
    taskId: number;
    prevTaskId?: number;
    nextTaskId?: number;
  }) {
    const model = await this.repository.findOne({
      id: params.taskId,
      userId: params.userId,
    });
    if (!model) {
      throw new Error('Task not found');
    }

    let prevModelSort = 0;
    if (params.prevTaskId) {
      const prevModel = await this.repository.findOne({
        id: params.prevTaskId,
        userId: params.userId,
      });
      if (!prevModel) {
        throw new Error('Task not found');
      }
      prevModelSort = prevModel.sort;
    }

    let nextModelSort = TaskModel.INITIAL_SORT_VALUE;
    if (params.nextTaskId) {
      const nextModel = await this.repository.findOne({
        id: params.nextTaskId,
        userId: params.userId,
      });
      if (!nextModel) {
        throw new Error('Task not found');
      }
      nextModelSort = nextModel.sort;
    }

    Object.assign(model, {
      sort: (prevModelSort + nextModelSort) / 2,
    });

    return await this.repository.save({ item: model });
  }
}
