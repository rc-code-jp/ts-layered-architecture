export class UserModel {
  constructor(
    readonly props: {
      id: number;
      email: string;
      password: string;
      name: string;
    },
  ) {}
}
