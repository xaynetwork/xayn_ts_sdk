import { IngestedDocument } from "./ingested_document";

export class IngestionRequest {
  constructor(readonly documents: Array<IngestedDocument>) {}
}
