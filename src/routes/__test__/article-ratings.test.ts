import request from "supertest";
import { Db, ObjectId } from "mongodb";
import { createApp } from "../../app";
import { initTestDB } from "../../../jest.setup";
import { getArticleRatingsMocks } from "../../mocks/article-ratings";
import { Response } from "supertest";
import { ArticleRating } from "../../types/models/article-rating";

let app: ReturnType<typeof createApp>;
let db: Db;

beforeAll(async () => {
  ({ app, db } = await initTestDB());
  await db.collection("article-ratings").insertMany(getArticleRatingsMocks());
});

describe("Article-ratings API", () => {
  it("GET /article-ratings", async () => {
    const query = {
      userId: "670e4a9955e53c8e609cf174",
      articleId: "670e4a0655e53c8e6099fcff",
    };
    const res: Response = await request(app)
      .get("/article-ratings")
      .query(query);
    const body = res.body as ArticleRating;
    expect(body._id).toBe("673f3f568b0d3c3fe74a47ed");
  });

  it("GET /article-ratings", async () => {
    const query = {
      userId: "670",
      articleId: "670",
    };
    const res: Response = await request(app)
      .get("/article-ratings")
      .query(query);
    const body = res.body as null;

    expect(body).toBeNull();
  });

  it("POST /article-ratings", async () => {
    const reqBody = {
      articleId: "articleId",
      userId: "userId",
      rate: 5,
      feedback: "Тестовый фидбэк",
    };
    const res: Response = await request(app)
      .post("/article-ratings")
      .send(reqBody);

    const insertedId = res.body._id as string;

    const insertedArticleRating = (await db
      .collection("article-ratings")
      .findOne({ _id: new ObjectId(insertedId) })) as ArticleRating;

    expect(insertedArticleRating.feedback).toBe("Тестовый фидбэк");
  });
});
