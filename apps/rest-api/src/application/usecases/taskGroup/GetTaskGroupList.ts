import { ITaskGroupRepository } from '@/application/repositories/ITaskGroupRepository';

export class GetTaskGroupList {
  constructor(private repository: ITaskGroupRepository) {}

  async execute(userId: number) {
    return await this.repository.findAll({
      userId,
    });
  }
}
