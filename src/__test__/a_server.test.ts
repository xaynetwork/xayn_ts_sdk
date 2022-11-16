import { expect } from "chai";
import "mocha";
import { IngestedDocument, Server } from "../index";

const endpoint = "{ENDPOINT}";
const environment = "default";
const token = "{TOKEN}";

const server = new Server({
  endpoint: endpoint,
  environment: environment,
  token: token,
});

describe("ingest documents", () => {
  it("EXPECT documents are ingested", async () => {
    let result = await server.ingest({
      documents: [
        new IngestedDocument(
          "test_a",
          "The world cup is starting next week! Who will be crowned champions?",
          {
            category: "sports",
          }
        ),
        new IngestedDocument(
          "test_b",
          "How to cook spaghetti in 20 easy steps",
          {
            category: "recipes",
          }
        ),
        new IngestedDocument(
          "test_c",
          "I wonder if this friggin test will ever work, love NPM really!",
          {
            category: "programming",
          }
        ),
        new IngestedDocument(
          "test_d",
          "Trump is attempting to go for a second term in 2024.",
          {
            category: "politics",
          }
        ),
        new IngestedDocument(
          "test_e",
          "Climate activists have glued themselves again on a famous painting in New York.",
          {
            category: "culture",
          }
        ),
      ],
    });

    expect(result).to.equal(true);
  });
});

describe("update single document's properties", () => {
  it("EXPECT to update properties", async () => {
    let result = await server.updateProperties({
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
    let result = await server.getProperties({
      documentId: "test_a",
    });

    expect(result["properties"]["category"]).to.equal("football");
  });
});

describe("delete single document's properties", () => {
  it("EXPECT to delete properties", async () => {
    let result = await server.deleteProperties({
      documentId: "test_a",
    });

    expect(result).to.equal(true);
  });
});

describe("delete single document", () => {
  it("EXPECT document is deleted", async () => {
    let result = await server.delete({
      documentId: "test_a",
    });

    expect(result).to.equal(true);
  });
});

describe("delete documents", () => {
  it("EXPECT documents are deleted", async () => {
    let result = await server.deleteAll({
      documents: ["test_b", "test_c"],
    });

    expect(result).to.equal(true);
  });
});
