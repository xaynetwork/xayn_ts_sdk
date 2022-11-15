import { expect } from "chai";
import "mocha";
import { Client } from "../index";

const endpoint = "{ENDPOINT}";
const environment = "{ENV}";
const token = "{TOKEN}";
const userId = "test";

describe("like documents", () => {
  it("EXPECT positive interaction", async () => {
    const client = new Client({
      endpoint: endpoint,
      environment: environment,
      token: token,
      userId: userId,
    });
    const result_a = await client.likeDocument({ documentId: "test_a" });
    const result_b = await client.likeDocument({ documentId: "test_b" });

    expect(result_a).to.equal(true);
    expect(result_b).to.equal(true);
  });
});

describe("personalized documents", () => {
  it("EXPECT results", async () => {
    const client = new Client({
      endpoint: endpoint,
      environment: environment,
      token: token,
      userId: userId,
    });
    const result = await client.personalizedDocuments({});

    expect(result.length).to.equal(10);
  });
});
