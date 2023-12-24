import { TaskModel } from '@/domain/models/TaskModel';

export interface ITaskRepository {
  findOne(id: number, userId: number): Promise<TaskModel | null>;
  save(item: TaskModel): Promise<TaskModel>;
  delete(item: TaskModel): Promise<TaskModel>;
  deleteDone(userId: number, taskGroupId?: number): Promise<number>;
}
