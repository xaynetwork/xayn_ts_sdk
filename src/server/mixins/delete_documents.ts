import { withAdditionalPathSegments } from "../../utils";
import { BaseServerCtr } from "../base_server";
import { DeleteDocumentsRequest } from "../model/delete_documents_request";

export function DeleteDocumentsMixin<TBase extends BaseServerCtr>(Base: TBase) {
  return class extends Base {
    async delete(args: { documentId: string }): Promise<boolean> {
      const uri = withAdditionalPathSegments(this.endpoint, ["documents", args.documentId]);
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

    async deleteAll(args: { documents: Array<string> }): Promise<boolean> {
      const uri = withAdditionalPathSegments(this.endpoint, ["documents"]);
      const payload = JSON.stringify(
        new DeleteDocumentsRequest(args.documents)
      );
      const response = await fetch(uri, {
        method: "DELETE",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          authorizationToken: this.token,
        },
        body: payload,
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
