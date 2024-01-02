import { BaseModel } from './BaseModel';
import { TaskModel } from './TaskModel';

export class TaskGroupModel extends BaseModel {
  readonly userId: number;
  readonly name: string;
  readonly sort: number;
  readonly tasks?: TaskModel[];

  static readonly INITIAL_SORT_VALUE = 65535;

  constructor(props: {
    id: number;
    userId: number;
    name: string;
    sort: number;
    tasks?: TaskModel[];
  }) {
    super({ id: props.id });
    this.userId = props.userId;
    this.name = props.name;
    this.sort = props.sort;
    this.tasks = props.tasks;
  }
}
