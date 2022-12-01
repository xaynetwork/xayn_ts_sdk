export class PersonalizedDocumentData {
  constructor(
    readonly id: string,
    readonly score: number,
    readonly properties?: Record<string, any>
  ) {}
}
