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
import { Server } from "../index";

const endpoint = "{ENDPOINT}";
const token = "{TOKEN}";

const server = new Server({
  endpoint: endpoint,
  token: token,
});

describe("ingest documents", () => {
  it("EXPECT documents are ingested", async () => {
    const result = await server.ingest({
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

    expect(result).to.equal(true);
  });
});

describe("update single document's properties", () => {
  it("EXPECT to update properties", async () => {
    const result = await server.updateProperties({
      documentId: "test_a",
      properties: {
        category: "football",
      },
    });

    expect(result).to.equal(true);
  });
});

describe("get single document's properties", () => {
  it("EXPECT to receive properties", async () => {
    const result = (await server.getProperties({
      documentId: "test_a",
    })) as { properties: { category: string } };

    expect(result.properties.category).to.equal("football");
  });
});

describe("delete single document's properties", () => {
  it("EXPECT to delete properties", async () => {
    const result = await server.deleteProperties({
      documentId: "test_a",
    });

    expect(result).to.equal(true);
  });
});

describe("delete single document", () => {
  it("EXPECT document is deleted", async () => {
    const result = await server.delete({
      documentId: "test_a",
    });

    expect(result).to.equal(true);
  });
});

describe("delete documents", () => {
  it("EXPECT documents are deleted", async () => {
    const result = await server.deleteAll({
      documents: ["test_b", "test_c"],
    });

    expect(result).to.equal(true);
  });
});
