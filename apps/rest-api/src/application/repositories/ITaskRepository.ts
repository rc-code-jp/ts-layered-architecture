import { TaskModel } from '@/domain/models/TaskModel';

export interface ITaskRepository {
  findOne(params: { id: number; userId: number }): Promise<TaskModel | null>;
  save(params: { item: TaskModel }): Promise<TaskModel>;
  delete(params: { item: TaskModel }): Promise<number>;
  deleteDone(params: { userId: number; taskGroupId?: number }): Promise<number>;
}
