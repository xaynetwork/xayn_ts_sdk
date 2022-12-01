import { BaseClient } from "./base_client";
import { LikeDocumentMixin, PersonalizedDocumentMixin } from "./mixins/mixins";

export * from "./model/errors";
export * from "./model/model";
export const Client = PersonalizedDocumentMixin(LikeDocumentMixin(BaseClient));

function _ts_type_helper() {
    return new Client({ token: '', endpoint: '', userId: '' });
}
export type Client = ReturnType<typeof _ts_type_helper>;
