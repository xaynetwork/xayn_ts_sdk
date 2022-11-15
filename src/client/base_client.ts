type _Constructor<T = {}> = new (...args: any[]) => T;

export type BaseClientCtr = _Constructor<BaseClient>;

export class BaseClient {
  readonly endpoint: URL;
  readonly environment: string;
  readonly token: string;
  readonly userId: string;

  constructor(args: {
    readonly token: string;
    readonly endpoint: string;
    readonly environment: string;
    readonly userId: string;
  }) {
    this.token = args.token;
    this.endpoint = new URL(args.endpoint);
    this.environment = args.environment;
    this.userId = args.userId;
  }
}
