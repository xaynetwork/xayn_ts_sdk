type _Constructor<T = {}> = new (...args: any[]) => T;

export type BaseClientCtr = _Constructor<BaseClient>;

export class BaseClient {
  readonly endpoint: URL;
  readonly token: string;
  readonly userId: string;

  constructor(args: {
    readonly token: string;
    readonly endpoint: string | URL;
    readonly userId: string;
  }) {
    this.token = args.token;
    this.endpoint = new URL(args.endpoint);
    this.userId = args.userId;
  }
}
