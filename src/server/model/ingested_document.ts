export class IngestedDocument {
  constructor(
    readonly id: string,
    readonly snippet: string,
    readonly properties?: Object,
  ) {}
}