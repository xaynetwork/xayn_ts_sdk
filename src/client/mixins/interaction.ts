import { BaseClientCtr } from "../base_client";
import {
  UserInteractionError,
  UserInteractionErrorKind,
} from "../model/errors";
import {
  UserInteractionData,
  UserInteractionRequest,
  UserInteractionType,
} from "../model/model";

export function LikeDocumentMixin<TBase extends BaseClientCtr>(Base: TBase) {
  return class extends Base {
    async likeDocument(args: { documentId: string }): Promise<boolean> {
      const uri = new URL(
        `${this.environment}/users/${this.userId}/interactions`,
        this.endpoint
      );
      const payload = JSON.stringify(
        new UserInteractionRequest([
          new UserInteractionData(
            args.documentId,
            UserInteractionType.positive
          ),
        ])
      );
      const response = await fetch(uri, {
        method: "PATCH",
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
