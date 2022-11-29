import { BaseServerCtr } from "../base_server";
import {
  IngestionError,
  IngestionErrorDetails,
  IngestionErrorDocumentData,
} from "../model/errors";
import { IngestedDocument } from "../model/ingested_document";
import { IngestionRequest } from "../model/ingestion_request";

export function DocumentsMixin<TBase extends BaseServerCtr>(Base: TBase) {
  return class extends Base {
    async ingest(args: {
      documents: Array<IngestedDocument>;
    }): Promise<boolean> {
      var _ingest = async (args: {
        documents: Array<IngestedDocument>;
      }): Promise<boolean> => {
        const uri = new URL(`${this.environment}/documents`, this.endpoint);
        const payload = JSON.stringify(new IngestionRequest(args.documents));
        const response = await fetch(uri, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorizationToken: this.token,
          },
          body: payload,
        });

        switch (response.status) {
          case 204:
            return true;
          case 400:
            throw new Error("Invalid request.");
          case 500:
            let error = await response.json();
            let details = error["details"] as Array<any>;
            let list = details.map((it) => {
              return new IngestionErrorDocumentData(it["id"], it["properties"]);
            });

            throw new IngestionError(
              new IngestionErrorDetails(list),
              "all or some of the documents were not successfully uploaded"
            );
          default:
            throw new Error(
              `Status code ${response.status}: "${response.statusText}", "${response.text}".`
            );
        }
      };

      // ingest in batches of 100, as this limit is imposed by our engine.
      for (var i = 0, len = args.documents.length; i < len; i += 100) {
        await _ingest({
          documents: args.documents.slice(i, i + 100),
        });
      }

      return true;
    }
  };
}
