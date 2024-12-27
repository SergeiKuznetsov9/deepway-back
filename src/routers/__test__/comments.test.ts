import request from "supertest";
import { Db, ObjectId } from "mongodb";
import { createApp } from "../../app";
import { initTestDB } from "../../../jest.setup";
import { Response } from "supertest";
import { getCommentsMocks } from "../../mocks/comments";
import { getUsersMocks } from "../../mocks/users";
import { Comment } from "../../types/models/comment";

let app: ReturnType<typeof createApp>;
let db: Db;

beforeAll(async () => {
  ({ app, db } = await initTestDB());
  await db.collection("comments").insertMany(getCommentsMocks());
  await db.collection("users").insertMany(getUsersMocks());
});

describe("Comments API", () => {
  it("GET /comments", async () => {
    const query = {
      articleId: "670e4a0655e53c8e6099fcf2",
    };
    const res: Response = await request(app).get("/comments").query(query);
    const body = res.body as Comment[];

    const isCorrectComments = body.every(
      (comment: Comment) => comment.articleId === query.articleId
    );
    const isNoUserData = body.every((comment: Comment) => !("user" in comment));
    expect(body.length).not.toBe(0);
    expect(isCorrectComments).toBe(true);
    expect(isNoUserData).toBe(true);
  });

  it("GET /comments", async () => {
    const query = {
      articleId: "670e4a0655e53c8e6099fcf2",
      _expand: "user",
    };
    const res: Response = await request(app).get("/comments").query(query);
    const body = res.body as Comment[];

    const isCorrectComments = body.every(
      (comment: Comment) => comment.articleId === query.articleId
    );
    const isUserData = body.every((comment: Comment) => "user" in comment);
    expect(body.length).not.toBe(0);
    expect(isCorrectComments).toBe(true);
    expect(isUserData).toBe(true);
  });

  it("POST /comments", async () => {
    const reqBody = {
      articleId: "articleId",
      userId: "userId",
      text: "Тестовый коммент",
    };
    const res: Response = await request(app).post("/comments").send(reqBody);

    const insertedId = res.body._id as string;

    const insertedComment = (await db
      .collection("comments")
      .findOne({ _id: new ObjectId(insertedId) })) as Comment;

    expect(insertedComment.text).toBe("Тестовый коммент");
  });
});
