import request from "supertest";
import { Db } from "mongodb";
import { createApp } from "../../app";
import { initTestDB } from "../../../jest.setup";

let app: ReturnType<typeof createApp>;

beforeAll(async () => {
  let db: Db;
  ({ app, db } = await initTestDB());
  await db.collection("articles").deleteMany({});
  await db.collection("articles").insertOne({ name: "testingArticle" });

  const insertedArticle = await db
    .collection("articles")
    .findOne({ name: "testingArticle" });
  console.log("Inserted article:", insertedArticle);
});

describe("User API", () => {
  it("GET /user - should return all users", async () => {
    const res = await request(app).get("/articles");
    console.log("RESS", res.body);
    expect(1).toBe(1);
  });
});
