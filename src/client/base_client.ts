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

import fetch from "cross-fetch";

import { withAdditionalPathSegments } from "../utils.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _Constructor<T = unknown> = new (...args: any[]) => T;

export type BaseClientCtr = _Constructor<BaseClient>;

export class BaseClient {
  readonly endpoint: URL;
  readonly token: string;
  readonly userId: string;

  constructor(args: {
    readonly token: string;
    readonly endpoint: string | URL;
    readonly userId: string;
  }) {
    this.token = args.token;
    this.endpoint = new URL(args.endpoint);
    this.userId = args.userId;
  }

  async _testing_isAvailable(): Promise<boolean> {
    const uri = withAdditionalPathSegments(this.endpoint, ["health"]);
    try {
      const response = await fetch(uri, {
        method: "GET",
        headers: {
          authorizationToken: this.token,
        },
      });
      return response.status == 200;
    } catch (e) {
      console.warn(e);
    }
    return false;
  }
}
