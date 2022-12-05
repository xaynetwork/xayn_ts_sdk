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

/// --------------------------------
/// PersonalizedDocumentsError
/// --------------------------------

export enum PersonalizedDocumentsErrorKind {
  NotEnoughInteractions,
  Unknown,
}

export class PersonalizedDocumentsError extends Error {
  readonly kind: PersonalizedDocumentsErrorKind;
  constructor(kind: PersonalizedDocumentsErrorKind, msg: string) {
    super(msg);

    this.kind = kind;

    Object.setPrototypeOf(this, PersonalizedDocumentsError.prototype);
  }
}

/// --------------------------------
/// UserInteractionError
/// --------------------------------

export enum UserInteractionErrorKind {
  InvalidUserId,
  InvalidDocumentId,
  Unknown,
}

export class UserInteractionError extends Error {
  readonly kind: UserInteractionErrorKind;
  constructor(kind: UserInteractionErrorKind, msg: string) {
    super(msg);

    this.kind = kind;

    Object.setPrototypeOf(this, UserInteractionError.prototype);
  }
}
