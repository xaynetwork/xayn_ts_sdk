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

import { withAdditionalPathSegments } from "../../utils.js";
import type { BaseClientCtr } from "../base_client.js";
import {
  PersonalizedDocumentsError,
  PersonalizedDocumentsErrorKind,
} from "../model/errors.js";
import type { PersonalizedDocumentData } from "../model/personalized_document_data.js";

export function PersonalizedDocumentMixin<TBase extends BaseClientCtr>(
  Base: TBase
) {
  return class extends Base {
    async personalizedDocuments(args: {
      count?: number;
    }): Promise<PersonalizedDocumentData[]> {
      const count = args.count ?? 10;

      if (count < 1 || count > 100) {
        throw new Error("`count` should be a value between 1 and 100");
      }

      const uri = withAdditionalPathSegments(this.endpoint, [
        "users",
        this.userId,
        "personalized_documents",
      ]);

      uri.searchParams.append("count", count.toString());

      const response = await fetch(uri, {
        method: "GET",
        headers: {
          Accept: "application/json",
          authorizationToken: this.token,
        },
      });

      switch (response.status) {
        case 200: {
          const json = await response.json();
          return json.documents as PersonalizedDocumentData[];
        }
        case 400:
          throw new Error("invalid user id.");
        case 404:
          throw new Error("user not found.");
        case 422: {
          const error = await response.json();
          let errorKind = null;

          switch (error.kind) {
            case "NotEnoughInteractions":
              errorKind = PersonalizedDocumentsErrorKind.NotEnoughInteractions;
              break;
            default:
              errorKind = PersonalizedDocumentsErrorKind.Unknown;
          }

          throw new PersonalizedDocumentsError(
            errorKind,
            "impossible to create a personalized list for the user."
          );
        }
        default:
          throw new Error(
            `Status code ${response.status}: "${response.statusText}", "${response.text}".`
          );
      }
    }
  };
}
