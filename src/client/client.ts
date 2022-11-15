import { BaseClient } from "./base_client";
import { LikeDocumentMixin, PersonalizedDocumentMixin } from "./mixins/mixins";

export * from "./model/errors";
export * from "./model/model";
export const Client = PersonalizedDocumentMixin(LikeDocumentMixin(BaseClient));
