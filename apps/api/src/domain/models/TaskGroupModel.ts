export class TaskGroupModel {
  constructor(
    readonly props: {
      id: number;
      name: string;
      sort: number;
    },
  ) {}
}
