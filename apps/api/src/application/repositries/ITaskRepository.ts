import { TaskModel } from '@/domain/models/TaskModel';

export interface ITaskRepository {
  findAll(userId: number): Promise<TaskModel[]>;
  findOne(id: number, userId: number): Promise<TaskModel | null>;
  save(task: TaskModel): Promise<TaskModel>;
  delete(id: number): Promise<TaskModel>;
}
