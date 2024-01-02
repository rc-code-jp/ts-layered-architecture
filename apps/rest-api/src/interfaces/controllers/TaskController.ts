import { ITaskRepository } from '@/application/repositories/ITaskRepository';
import { CreateTask } from '@/application/usecases/task/CreateTask';
import { DeleteDoneTasks } from '@/application/usecases/task/DeleteDoneTasks';
import { DeleteTask } from '@/application/usecases/task/DeleteTask';
import { UpdateTask } from '@/application/usecases/task/UpdateTask';
import { UpdateTaskSort } from '@/application/usecases/task/UpdateTaskSort';
import { TaskRepository } from '../database/TaskRepository';

export class TaskController {
  private taskRepository: ITaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async createTask(params: {
    taskGroupId: number;
    userId: number;
    title: string;
    description?: string;
    dueDate?: string;
    dueTime?: string;
  }) {
    const usecase = new CreateTask(this.taskRepository);
    const item = await usecase.execute({
      userId: params.userId,
      taskGroupId: params.taskGroupId,
      title: params.title,
      description: params.description,
      dueDate: params.dueDate,
      dueTime: params.dueTime,
    });

    return item.id;
  }

  async updateTask(params: {
    id: number;
    userId: number;
    title: string;
    description?: string;
    dueDate?: string;
    dueTime?: string;
    done?: boolean;
  }) {
    const usecase = new UpdateTask(this.taskRepository);
    const item = await usecase.execute({
      taskId: params.id,
      userId: params.userId,
      title: params.title,
      description: params.description,
      dueDate: params.dueDate,
      dueTime: params.dueTime,
      done: params.done,
      sort: 0,
    });

    return item.id;
  }

  async updateTaskDone(params: {
    id: number;
    userId: number;
    done: boolean;
  }) {
    const usecase = new UpdateTask(this.taskRepository);
    const item = await usecase.execute({
      taskId: params.id,
      userId: params.userId,
      done: params.done,
    });

    return item.id;
  }

  async deleteTask(params: {
    id: number;
    userId: number;
  }) {
    const usecase = new DeleteTask(this.taskRepository);
    const res = await usecase.execute({
      userId: params.userId,
      taskId: params.id,
    });

    return res;
  }

  async deleteDoneTasks(params: {
    userId: number;
    taskGroupId?: number;
  }) {
    const usecase = new DeleteDoneTasks(this.taskRepository);
    const count = await usecase.execute({
      userId: params.userId,
      taskGroupId: params.taskGroupId,
    });

    return count;
  }

  async updateTaskSort(params: {
    id: number;
    userId: number;
    prevTaskId?: number;
    nextTaskId?: number;
  }) {
    const usecase = new UpdateTaskSort(this.taskRepository);
    const item = await usecase.execute({
      taskId: params.id,
      userId: params.userId,
      prevTaskId: params.prevTaskId,
      nextTaskId: params.nextTaskId,
    });

    return item.id;
  }
}
