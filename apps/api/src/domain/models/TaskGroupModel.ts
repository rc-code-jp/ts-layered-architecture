export class TaskGroupModel {
  constructor(
    readonly props: {
      id: number;
      userId: number;
      name: string;
      sort: number;
    },
  ) {}
}
