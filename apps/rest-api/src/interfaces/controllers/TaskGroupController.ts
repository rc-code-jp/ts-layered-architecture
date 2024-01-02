import { ITaskGroupRepository } from '@/application/repositories/ITaskGroupRepository';
import { CreateTaskGroup } from '@/application/usecases/taskGroup/CreateTaskGroup';
import { DeleteTaskGroup } from '@/application/usecases/taskGroup/DeleteTaskGroup';
import { GetTaskGroup } from '@/application/usecases/taskGroup/GetTaskGroup';
import { GetTaskGroupList } from '@/application/usecases/taskGroup/GetTaskGroupList';
import { UpdateTaskGroup } from '@/application/usecases/taskGroup/UpdateTaskGroup';
import { UpdateTaskGroupSort } from '@/application/usecases/taskGroup/UpdateTaskGroupSort';
import { TaskGroupRepository } from '../database/TaskGroupRepository';

export class TaskGroupController {
  private taskGroupRepository: ITaskGroupRepository;

  constructor() {
    this.taskGroupRepository = new TaskGroupRepository();
  }

  async getTaskGroup(params: {
    id: number;
    userId: number;
  }) {
    const usecase = new GetTaskGroup(this.taskGroupRepository);
    const item = await usecase.execute({
      id: params.id,
      userId: params.userId,
    });

    return item;
  }

  async getTaskGroupList(params: {
    userId: number;
  }) {
    const usecase = new GetTaskGroupList(this.taskGroupRepository);
    const list = await usecase.execute(params.userId);

    return list;
  }

  async createTaskGroup(params: {
    userId: number;
    name: string;
  }) {
    const usecase = new CreateTaskGroup(this.taskGroupRepository);
    const item = await usecase.execute({
      name: params.name,
      userId: params.userId,
    });

    return item.id;
  }

  async updateTaskGroup(params: {
    id: number;
    userId: number;
    name: string;
  }) {
    const usecase = new UpdateTaskGroup(this.taskGroupRepository);
    const item = await usecase.execute({
      userId: params.userId,
      taskGroupId: params.id,
      name: params.name,
    });

    return item.id;
  }

  async deleteTaskGroup(params: {
    id: number;
    userId: number;
  }) {
    const usecase = new DeleteTaskGroup(this.taskGroupRepository);
    const res = await usecase.execute({
      taskGroupId: params.id,
      userId: params.userId,
    });

    return res;
  }

  async updateTaskGroupSort(params: {
    id: number;
    userId: number;
    prevTaskId?: number;
    nextTaskId?: number;
  }) {
    const usecase = new UpdateTaskGroupSort(this.taskGroupRepository);
    const item = await usecase.execute({
      taskId: params.id,
      userId: params.userId,
      prevTaskId: params.prevTaskId,
      nextTaskId: params.nextTaskId,
    });

    return item.id;
  }
}
