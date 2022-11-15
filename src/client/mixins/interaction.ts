import { BaseClientCtr } from "../base_client";
import { UserInteractionError, UserInteractionErrorKind } from "../model/errors";
import { UserInteractionData, UserInteractionRequest, UserInteractionType } from "../model/model";

export function LikeDocumentMixin<TBase extends BaseClientCtr>(Base: TBase) {
  return class extends Base {
    async likeDocument(args: { documentId: string }): Promise<boolean> {
      let uri = new URL(`users/${this.userId}/interaction`, this.endpoint);

      const response = await fetch(uri, {
        method: "GET",
        headers: {
          Accept: "application/json",
          authorizationToken: this.token,
        },
        body: JSON.stringify(
          new UserInteractionRequest([
            new UserInteractionData(
              args.documentId,
              UserInteractionType.positive
            ),
          ]),
          null,
          "\t"
        ),
      });

      switch (response.status) {
        case 204:
          return true;
        case 400:
          let error = await response.json();
          let errorKind = null;

          switch (error["kind"]) {
            case "InvalidUserId":
              errorKind = UserInteractionErrorKind.InvalidUserId;
              break;
            case "InvalidDocumentId":
              errorKind = UserInteractionErrorKind.InvalidDocumentId;
              break;
          }

          throw new UserInteractionError(
            errorKind!,
            "invalid request. User or document id is invalid"
          );
        default:
          throw new Error(
            `Status code ${response.status}: "${response.statusText}", "${response.text}".`
          );
      }
    }
  };
}
