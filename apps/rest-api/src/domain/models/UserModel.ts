export class UserModel {
  readonly id: number;
  readonly email: string;
  readonly password: string;
  readonly name: string;

  constructor(props: {
    id: number;
    email: string;
    password: string;
    name: string;
  }) {
    this.id = props.id;
    this.email = props.email;
    this.password = props.password;
    this.name = props.name;
  }
}
