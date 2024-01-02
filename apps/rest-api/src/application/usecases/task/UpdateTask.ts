import { ITaskRepository } from '@/application/repositories/ITaskRepository';

export class UpdateTask {
  constructor(private repository: ITaskRepository) {}

  async execute(params: {
    userId: number;
    taskId: number;
    title?: string;
    description?: string;
    dueDate?: string;
    dueTime?: string;
    done?: boolean;
    sort?: number;
  }) {
    const model = await this.repository.findOne({
      id: params.taskId,
      userId: params.userId,
    });
    if (!model) {
      throw new Error('Task not found');
    }

    Object.assign(model, params);

    return await this.repository.save({ item: model });
  }
}
