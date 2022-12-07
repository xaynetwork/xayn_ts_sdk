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
import { Server } from "../src/index.js";

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

describe("/documents endpoint", () => {
  before(async function () {
    if (!hasOverrides && !(await server._testing_isAvailable())) {
      this.skip();
    }
    await server.ingest({
      documents: [
        {
          id: "test_a",
          snippet:
            "The world cup is starting next week! Who will be crowned champions?",
          properties: {
            category: "sports",
          },
        },
        {
          id: "test_b",
          snippet: "How to cook spaghetti in 20 easy steps",
          properties: {
            category: "recipes",
          },
        },
        {
          id: "test_c",
          snippet:
            "I wonder if this friggin test will ever work, love NPM really!",
          properties: {
            category: "programming",
          },
        },
        {
          id: "test_d",
          snippet: "Trump is attempting to go for a second term in 2024.",
          properties: {
            category: "politics",
          },
        },
        {
          id: "test_e",
          snippet:
            "Climate activists have glued themselves again on a famous painting in New York.",
          properties: {
            category: "culture",
          },
        },
      ],
    });
  });

  it("documents are ingested", async () => {
    //FIXME use document query endpoint to check if they are ingested
    //     for now we just check properties
    let properties = await server.getProperties({
      documentId: "test_a",
    });
    expect(properties["category"]).to.equal("sports");

    properties = await server.getProperties({
      documentId: "test_b",
    });
    expect(properties["category"]).to.equal("recipes");

    properties = await server.getProperties({
      documentId: "test_c",
    });
    expect(properties["category"]).to.equal("programming");

    properties = await server.getProperties({
      documentId: "test_d",
    });
    expect(properties["category"]).to.equal("politics");

    properties = await server.getProperties({
      documentId: "test_e",
    });
    expect(properties["category"]).to.equal("culture");
  });

  describe("properties", () => {
    it("updating all properties of one document", async () => {
      await server.updateProperties({
        documentId: "test_a",
        properties: {
          category: "football",
        },
      });
      const properties = await server.getProperties({
        documentId: "test_a",
      });
      expect(properties["category"]).to.equal("football");
    });

    it("deleting all properties of one document", async () => {
      await server.deleteProperties({
        documentId: "test_a",
      });
      const properties = await server.getProperties({
        documentId: "test_a",
      });
      expect(properties).to.be.empty;
    });
  });

  async function testDocumentDoesNotExist(documentId: string) {
    let exception = null;
    try {
      await server.getProperties({
        documentId,
      });
    } catch (e) {
      exception = e;
    }

    expect(exception).instanceOf(Error, "Document id not found.");
  }

  it("delete one document", async () => {
    await server.ingest({
      documents: [
        {
          id: "test_delete_1",
          snippet: "foo bar baz",
          properties: {
            category: "software",
          },
        },
      ],
    });

    await server.delete({
      documentId: "test_delete_1",
    });

    await testDocumentDoesNotExist("test_delete_1");
  });

  it("delete multiple documents", async () => {
    await server.ingest({
      documents: [
        {
          id: "test_delete_20",
          snippet: "foo bar baz 2",
          properties: {
            category: "software2",
          },
        },
        {
          id: "test_delete_30",
          snippet: "foo bar baz 3",
          properties: {
            category: "software3",
          },
        },
      ],
    });

    await server.deleteAll({
      documents: ["test_delete_20", "test_delete_30"],
    });

    await testDocumentDoesNotExist("test_delete_20");
    await testDocumentDoesNotExist("test_delete_30");
  });
});
