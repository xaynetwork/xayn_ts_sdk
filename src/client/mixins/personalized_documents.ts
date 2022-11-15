import { BaseClientCtr } from "../base_client";
import { PersonalizedDocumentsError, PersonalizedDocumentsErrorKind } from "../model/errors";
import { PersonalizedDocumentData } from "../model/personalized_document_data";

export function PersonalizedDocumentMixin<TBase extends BaseClientCtr>(
  Base: TBase
) {
  return class extends Base {
    async personalizedDocuments(args: {
      count?: number;
    }): Promise<Array<PersonalizedDocumentData>> {
      let count = args.count ?? 10;

      if (count < 1 || count > 100) {
        throw new Error("`count` should be a value between 1 and 100");
      }

      let uri = new URL(
        `users/${this.userId}/personalized_documents`,
        this.endpoint
      );

      uri.searchParams.append("count", count.toString());

      const response = await fetch(uri, {
        method: "GET",
        headers: {
          Accept: "application/json",
          authorizationToken: this.token,
        },
      });

      switch (response.status) {
        case 200:
          let documents = (await response.json()) as Array<Map<string, any>>;

          return documents.map(
            (it) =>
              new PersonalizedDocumentData(
                it.get("id")!,
                it.get("score")!,
                it.get("properties")
              )
          );
        case 400:
          throw new Error("invalid user id.");
        case 404:
          throw new Error("user not found.");
        case 422:
          let error = await response.json();
          let errorKind = null;

          switch (error["kind"]) {
            case "NotEnoughInteractions":
              errorKind = PersonalizedDocumentsErrorKind.NotEnoughInteractions;
          }

          throw new PersonalizedDocumentsError(
            errorKind!,
            "impossible to create a personalized list for the user."
          );
        default:
          throw new Error(
            `Status code ${response.status}: "${response.statusText}", "${response.text}".`
          );
      }
    }
  };
}
