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

import fetch from "cross-fetch";

import { withAdditionalPathSegments } from "../../utils";
import type { BaseServerCtr } from "../base_server";

export function DeleteDocumentsMixin<TBase extends BaseServerCtr>(Base: TBase) {
  return class extends Base {
    async delete(args: { documentId: string }): Promise<boolean> {
      const uri = withAdditionalPathSegments(this.endpoint, [
        "documents",
        args.documentId,
      ]);
      const response = await fetch(uri, {
        method: "DELETE",
        headers: {
          Accept: "*/*",
          authorizationToken: this.token,
        },
      });

      switch (response.status) {
        case 204:
          return true;
        case 400:
          throw new Error("Invalid request.");
        default:
          throw new Error(
            `Status code ${response.status}: "${response.statusText}", "${response.text}".`
          );
      }
    }

    async deleteAll(args: { documents: string[] }): Promise<boolean> {
      const uri = withAdditionalPathSegments(this.endpoint, ["documents"]);
      const response = await fetch(uri, {
        method: "DELETE",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          authorizationToken: this.token,
        },
        body: JSON.stringify({
          document: args.documents,
        }),
      });

      switch (response.status) {
        case 204:
          return true;
        case 400:
          throw new Error("Invalid document id.");
        case 404:
          throw new Error("Document id not found.");
        default:
          throw new Error(
            `Status code ${response.status}: "${response.statusText}", "${response.text}".`
          );
      }
    }
  };
}
