/// --------------------------------
/// PersonalizedDocumentsError
/// --------------------------------

export enum PersonalizedDocumentsErrorKind {
    NotEnoughInteractions,
  }
  
  export class PersonalizedDocumentsError extends Error {
    constructor(readonly kind: PersonalizedDocumentsErrorKind, msg: string) {
      super(msg);
  
      Object.setPrototypeOf(this, PersonalizedDocumentsError.prototype);
    }
  }

/// --------------------------------
/// UserInteractionError
/// --------------------------------

export enum UserInteractionErrorKind {
    InvalidUserId,
    InvalidDocumentId,
  }
  
  export class UserInteractionError extends Error {
    constructor(readonly kind: UserInteractionErrorKind, msg: string) {
      super(msg);
  
      Object.setPrototypeOf(this, UserInteractionError.prototype);
    }
  }