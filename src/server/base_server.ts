type _Constructor<T = {}> = new (...args: any[]) => T;

export type BaseServerCtr = _Constructor<BaseServer>;

export class BaseServer {
  readonly endpoint: URL;
  readonly environment: string;
  readonly token: string;

  constructor(args: {
    readonly token: string;
    readonly endpoint: string;
    readonly environment: string;
  }) {
    this.token = args.token;
    this.endpoint = new URL(args.endpoint);
    this.environment = args.environment;
  }
}
