/// --------------------------------
/// IngestionError
/// --------------------------------

export class IngestionError extends Error {
  constructor(readonly details: IngestionErrorDetails, msg: string) {
    super(msg);

    Object.setPrototypeOf(this, IngestionError.prototype);
  }
}

export class IngestionErrorDetails {
  constructor(readonly documents: Array<IngestionErrorDocumentData>) {}
}

export class IngestionErrorDocumentData {
  constructor(readonly id: string, readonly properties?: Map<string, any>) {}
}
