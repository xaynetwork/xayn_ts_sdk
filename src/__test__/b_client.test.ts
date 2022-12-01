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
