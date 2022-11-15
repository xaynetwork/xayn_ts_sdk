type _Constructor<T = {}> = new (...args: any[]) => T;

export type BaseClientCtr = _Constructor<BaseClient>;

export class BaseClient {
  readonly endpoint: URL;
  readonly token: string;
  readonly userId: string;
  readonly readingTimeToLikeTreshold: number;

  constructor(args: {
    readonly token: string;
    readonly endpoint: string;
    readonly userId: string;
    readonly readingTimeToLikeTreshold?: number;
  }) {
    this.token = args.token;
    this.endpoint = new URL(args.endpoint);
    this.userId = args.userId;
    this.readingTimeToLikeTreshold = args.readingTimeToLikeTreshold ?? -1;
  }
}