import { TaskGroupModel } from '@/domain/models/TaskGroupModel';

export interface ITaskGroupRepository {
  findAll(params: { userId: number }): Promise<TaskGroupModel[]>;
  findOne(params: { id: number; userId: number }): Promise<TaskGroupModel | null>;
  save(params: { item: TaskGroupModel }): Promise<TaskGroupModel>;
  delete(params: { taskGroupId: number; userId: number }): Promise<number>;
}
