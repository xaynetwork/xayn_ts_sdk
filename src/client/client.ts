import { BaseClient } from "./base_client";
import { LikeDocumentMixin, PersonalizedDocumentMixin } from "./mixins/mixins";

export * from "./model/errors";
export * from "./model/model";
export const Client = PersonalizedDocumentMixin(LikeDocumentMixin(BaseClient));

const _client = new Client({ token: '', endpoint: 'https://d.invalid', environment: '', userId: '' });
export type Client = typeof _client;
