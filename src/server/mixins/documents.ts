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

import { withAdditionalPathSegments } from "../../utils";
import { BaseServerCtr } from "../base_server";
import {
  IngestionError,
  IngestionErrorDetails,
  IngestionErrorDocumentData,
} from "../model/errors";
import { IngestedDocument } from "../model/ingested_document";

export function DocumentsMixin<TBase extends BaseServerCtr>(Base: TBase) {
  return class extends Base {
    async ingest(args: { documents: IngestedDocument[] }): Promise<void> {
      const _ingest = async (args: {
        documents: IngestedDocument[];
      }): Promise<void> => {
        const uri = withAdditionalPathSegments(this.endpoint, ["documents"]);
        const response = await fetch(uri, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorizationToken: this.token,
          },
          body: JSON.stringify({
            documents: args.documents,
          }),
        });

        switch (response.status) {
          case 204:
            return;
          case 400:
            throw new Error("Invalid request.");
          case 500: {
            const error = await response.json();
            const details = error.details as {
              id: string;
              properties?: Record<string, unknown>;
            }[];
            const list = details.map((it) => {
              return new IngestionErrorDocumentData(it.id, it.properties);
            });

            throw new IngestionError(
              new IngestionErrorDetails(list),
              "all or some of the documents were not successfully uploaded"
            );
          }
          default:
            throw new Error(
              `Status code ${response.status}: "${response.statusText}", "${response.text}".`
            );
        }
      };

      // ingest in batches of 100, as this limit is imposed by our engine.
      for (let i = 0, len = args.documents.length; i < len; i += 100) {
        await _ingest({
          documents: args.documents.slice(i, i + 100),
        });
      }
    }
  };
}
