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
import type { BaseClientCtr } from "../base_client";
import {
  UserInteractionError,
  UserInteractionErrorKind,
} from "../model/errors";

export function LikeDocumentMixin<TBase extends BaseClientCtr>(Base: TBase) {
  return class extends Base {
    async likeDocument(args: { documentId: string }): Promise<boolean> {
      const uri = withAdditionalPathSegments(this.endpoint, [
        "users",
        this.userId,
        "interactions",
      ]);

      const response = await fetch(uri, {
        method: "PATCH",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          authorizationToken: this.token,
        },
        body: JSON.stringify({
          documents: {
            id: args.documentId,
            type: "positive",
          },
        }),
      });

      switch (response.status) {
        case 204:
          return true;
        case 400: {
          const error = await response.json();
          let errorKind = null;

          switch (error.kind) {
            case "InvalidUserId":
              errorKind = UserInteractionErrorKind.InvalidUserId;
              break;
            case "InvalidDocumentId":
              errorKind = UserInteractionErrorKind.InvalidDocumentId;
              break;
            default:
              errorKind = UserInteractionErrorKind.Unknown;
          }

          throw new UserInteractionError(
            errorKind,
            "invalid request. User or document id is invalid"
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
