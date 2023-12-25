import { ITaskGroupRepository } from '@/application/repositories/ITaskGroupRepository';
import { ITaskRepository } from '@/application/repositories/ITaskRepository';
import { CreateTask } from '@/application/usecases/task/CreateTask';
import { DeleteDoneTasks } from '@/application/usecases/task/DeleteDoneTasks';
import { DeleteTask } from '@/application/usecases/task/DeleteTask';
import { GetTask } from '@/application/usecases/task/GetTask';
import { UpdateTask } from '@/application/usecases/task/UpdateTask';
import { GetTaskGroup } from '@/application/usecases/taskGroup/GetTaskGroup';
import { TaskGroupRepository } from '../database/TaskGroupRepository';
import { TaskRepository } from '../database/TaskRepository';

export class TaskController {
  private taskRepository: ITaskRepository;
  private taskGroupRepository: ITaskGroupRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
    this.taskGroupRepository = new TaskGroupRepository();
  }

  async createTask(params: {
    taskGroupId: number;
    userId: number;
    title: string;
    description?: string;
    dueDate?: string;
    dueTime?: string;
  }) {
    const getTaskGroup = new GetTaskGroup(this.taskGroupRepository);
    const taskGroup = await getTaskGroup.execute({
      id: params.taskGroupId,
      userId: params.userId,
    });

    if (!taskGroup) {
      return 0;
    }

    const createTask = new CreateTask(this.taskRepository);
    const item = await createTask.execute({
      props: {
        taskGroupId: params.taskGroupId,
        title: params.title,
        description: params.description,
        dueDate: params.dueDate,
        dueTime: params.dueTime,
        sort: 0,
      },
    });

    return item.props.id;
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
    const getTask = new GetTask(this.taskRepository);
    const task = await getTask.execute({
      id: params.id,
      userId: params.userId,
    });

    if (!task) {
      return 0;
    }

    const updateTask = new UpdateTask(this.taskRepository);
    const item = await updateTask.execute({
      props: {
        ...task.props,
        title: params.title,
        description: params.description,
        dueDate: params.dueDate,
        dueTime: params.dueTime,
        done: params.done,
        sort: 0,
      },
    });

    return item.props.id;
  }

  async updateTaskDone(params: {
    id: number;
    userId: number;
    done?: boolean;
  }) {
    const getTask = new GetTask(this.taskRepository);
    const task = await getTask.execute({
      id: params.id,
      userId: params.userId,
    });

    if (!task) {
      throw new Error('Not Found Task');
    }

    const updateTask = new UpdateTask(this.taskRepository);
    const item = await updateTask.execute({
      props: {
        ...task.props,
        done: params.done,
      },
    });

    return item.props.id;
  }

  async deleteTask(params: {
    id: number;
    userId: number;
  }) {
    const getTask = new GetTask(this.taskRepository);
    const task = await getTask.execute({
      id: params.id,
      userId: params.userId,
    });

    if (!task) {
      throw new Error('Not Found Task');
    }

    const deleteTask = new DeleteTask(this.taskRepository);
    await deleteTask.execute({
      userId: params.userId,
      taskGroupId: params.id,
    });

    return params.id;
  }

  async deleteDoneTasks(params: {
    userId: number;
    taskGroupId?: number;
  }) {
    const deleteDoneTasks = new DeleteDoneTasks(this.taskRepository);
    const count = await deleteDoneTasks.execute({
      userId: params.userId,
      taskGroupId: params.taskGroupId,
    });

    return count;
  }
}
