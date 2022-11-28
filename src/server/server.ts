import { BaseServer } from "./base_server";
import { DeleteDocumentsMixin } from "./mixins/delete_documents";
import { DocumentsMixin } from "./mixins/documents";
import { DocumentPropertiesMixin } from "./mixins/document_properties";

export * from "./model/errors";
export * from "./model/model";
export const Server = DocumentPropertiesMixin(
  DeleteDocumentsMixin(DocumentsMixin(BaseServer))
);

const _server = new Server({ token: '', endpoint: 'https://d.invalid', environment: '', });
export type Server = typeof _server;
