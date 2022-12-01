type _Constructor<T = {}> = new (...args: any[]) => T;

export type BaseServerCtr = _Constructor<BaseServer>;

export class BaseServer {
  readonly endpoint: URL;
  readonly token: string;

  constructor(args: {
    readonly token: string;
    readonly endpoint: string | URL;
  }) {
    this.token = args.token;
    this.endpoint = new URL(args.endpoint);
  }
}
