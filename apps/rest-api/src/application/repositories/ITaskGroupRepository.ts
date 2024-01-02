import { TaskGroupModel } from '@/domain/models/TaskGroupModel';

export interface ITaskGroupRepository {
  findAll(params: { userId: number }): Promise<TaskGroupModel[]>;
  findOne(params: { id: number; userId: number }): Promise<TaskGroupModel | null>;
  findMaxSort(params: { userId: number }): Promise<number>;
  save(params: { item: TaskGroupModel }): Promise<TaskGroupModel>;
  delete(params: { item: TaskGroupModel }): Promise<number>;
}
