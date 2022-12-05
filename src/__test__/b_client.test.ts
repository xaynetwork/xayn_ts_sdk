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
import { Client } from "../index";

const endpoint = "{ENFPOINT}";
const token = "{TOKEN}";
const userId = "test";

const client = new Client({
  endpoint: endpoint,
  token: token,
  userId: userId,
});

describe("like documents", () => {
  it("EXPECT positive interaction", async () => {
    const result_a = await client.likeDocument({ documentId: "test_d" });
    const result_b = await client.likeDocument({ documentId: "test_e" });

    expect(result_a).to.equal(true);
    expect(result_b).to.equal(true);
  });
});

describe("personalized documents", () => {
  it("EXPECT results", async () => {
    const result = await client.personalizedDocuments({});

    expect(result.length).to.equal(10);
  });
});
