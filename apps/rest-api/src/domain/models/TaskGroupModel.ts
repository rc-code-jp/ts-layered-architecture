import { BaseModel } from './BaseModel';
import { TaskModel } from './TaskModel';

export class TaskGroupModel extends BaseModel {
  readonly id?: number;
  readonly userId: number;
  readonly name: string;
  readonly sort: number;
  readonly tasks?: TaskModel[];

  constructor(props: {
    id?: number;
    userId: number;
    name: string;
    sort: number;
    tasks?: TaskModel[];
  }) {
    super();
    this.id = props.id;
    this.userId = props.userId;
    this.name = props.name;
    this.sort = props.sort;
    this.tasks = props.tasks;
  }
}
