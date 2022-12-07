// Copyright 2022 Xayn AG
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { BaseClient } from "./base_client";
import { LikeDocumentMixin, PersonalizedDocumentMixin } from "./mixins/mixins";

export * from "./model/errors";
export * from "./model/model";
export const Client = PersonalizedDocumentMixin(LikeDocumentMixin(BaseClient));

function _ts_type_helper() {
  return new Client({ token: "", endpoint: "", userId: "" });
}
export type Client = ReturnType<typeof _ts_type_helper>;
