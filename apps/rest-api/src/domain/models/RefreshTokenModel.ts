export class RefreshTokenModel {
  constructor(
    readonly props: {
      id?: number;
      uuid: string;
      hashedToken: string;
      userId: number;
      revoked: boolean;
    },
  ) {}
}
