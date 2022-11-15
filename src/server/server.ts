import { BaseServer } from "./base_server";
import { DocumentsMixin } from "./mixins/documents";

export * from "./model/errors";
export * from "./model/model";
export const Server = DocumentsMixin(BaseServer);
