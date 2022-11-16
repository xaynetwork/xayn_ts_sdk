import { BaseServerCtr } from "../base_server";
import { DocumentPropertiesRequest } from "../model/document_properties_request";

export function DocumentPropertiesMixin<TBase extends BaseServerCtr>(
  Base: TBase
) {
  return class extends Base {
    async getProperties(args: { documentId: string }): Promise<any> {
      const uri = new URL(
        `${this.environment}/documents/${args.documentId}/properties`,
        this.endpoint
      );
      const response = await fetch(uri, {
        method: "GET",
        headers: {
          Accept: "application/json",
          authorizationToken: this.token,
        },
      });

      switch (response.status) {
        case 200:
          return await response.json();
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

    async updateProperties(args: {
      documentId: string;
      properties: Object;
    }): Promise<boolean> {
      const uri = new URL(
        `${this.environment}/documents/${args.documentId}/properties`,
        this.endpoint
      );
      const payload = JSON.stringify(
        new DocumentPropertiesRequest(args.properties)
      );
      const response = await fetch(uri, {
        method: "PUT",
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

    async deleteProperties(args: { documentId: string }): Promise<boolean> {
      const uri = new URL(
        `${this.environment}/documents/${args.documentId}/properties`,
        this.endpoint
      );
      const response = await fetch(uri, {
        method: "DELETE",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          authorizationToken: this.token,
        },
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
