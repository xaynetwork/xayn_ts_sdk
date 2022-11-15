import { UserInteractionData } from "./user_interaction_data";

export class UserInteractionRequest {
  constructor(readonly documents: Array<UserInteractionData>) {}
}
