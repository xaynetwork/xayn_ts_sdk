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

import { expect } from "chai";
import "mocha";
import { env } from "process";
import { Client, Server } from "../src/index.js";

//FIXME code dedup
let hasOverrides = false;
function get_env(key: string, fallback: string): string {
  const value = env[key] ?? "";
  if (value == "") {
    return fallback;
  } else {
    hasOverrides = true;
    return value;
  }
}

const userId = "test";

const client = new Client({
  endpoint: get_env(
    "XAYN_TS_SDK_TEST_CLIENT_ENDPOINT_OVERRIDE",
    "http://localhost:3031"
  ),
  token: get_env(
    "XAYN_TS_SDK_TEST_CLIENT_TOKEN_OVERRIDE",
    "invalid: this is for local testing only"
  ),
  userId: userId,
});

const server = new Server({
  endpoint: get_env(
    "XAYN_TS_SDK_TEST_SERVER_ENDPOINT_OVERRIDE",
    "http://localhost:3030"
  ),
  token: get_env(
    "XAYN_TS_SDK_TEST_SERVER_TOKEN_OVERRIDE",
    "invalid: this is for local testing only"
  ),
});

const numberDocuments = 20;

describe("/users/{user_id}", () => {
  before(async function () {
    if (!hasOverrides && !(await client.isAvailable())) {
      this.skip();
    }
    const documents = new Array(numberDocuments);
    for (let x = 0; x < documents.length; x++) {
      documents[x] = {
        id: `client-doc-${x}`,
        snippet: `Some random ${x} values.`,
        properties: {
          category: `cat-${x}`,
        },
      };
    }
    await server.ingest({ documents });
  });

  it("after two interactions personalized documents are returned", async () => {
    await client.likeDocument({
      documentId: "client-doc-1",
    });
    await client.likeDocument({
      documentId: "client-doc-2",
    });

    const result = await client.personalizedDocuments({});

    expect(result.length).to.equal(10);
  });
});
