import { UserInteractionType } from "./user_interaction_type";

export class UserInteractionData {
  constructor(readonly id: String, readonly type: UserInteractionType) {}
}
