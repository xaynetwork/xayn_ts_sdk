import { expect } from "chai";
import "mocha";
import { IngestedDocument, Server } from "../index";

const endpoint = "{ENDPOINT}";
const environment = "{ENV}";
const token = "{TOKEN}";

describe("ingest documents", () => {
  it("EXPECT documents are ingested", async () => {
    const server = new Server({
      endpoint: endpoint,
      environment: environment,
      token: token,
    });

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
      ],
    });

    expect(result).to.equal(true);
  });
});
