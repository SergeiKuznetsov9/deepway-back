import request from "supertest";
import { Db, ObjectId } from "mongodb";
import { createApp } from "../../app";
import { initTestDB } from "../../../jest.setup";
import { Response } from "supertest";
import { getCommentsMocks } from "../../mocks/comments";
import { getUsersMocks } from "../../mocks/users";
import { Comment } from "../../types/models/comment";
import { ErrorMessage } from "../../types/models/messages";

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

  it("GET /comments with invalid data", async () => {
    const query = {
      articleId: "670e4a0655e53c8e6099fcf2q",
      _expand: "users",
    };
    const res: Response = await request(app).get("/comments").query(query);
    const body = res.body as ErrorMessage;
    expect(body).toEqual({
      error: 'The value of "_expand" must be user; Invalid article id',
    });
  });

  it("POST /comments", async () => {
    const reqBody = {
      articleId: "670e4a0655e53c8e6099fcf2",
      userId: "670e4a9955e53c8e609cf174",
      text: "Тестовый коммент",
    };
    const res: Response = await request(app).post("/comments").send(reqBody);

    const insertedId = res.body._id as string;

    const insertedComment = (await db
      .collection("comments")
      .findOne({ _id: new ObjectId(insertedId) })) as Comment;

    expect(insertedComment.text).toBe("Тестовый коммент");
  });

  it("POST /comments with invalid data", async () => {
    const reqBody = {
      articleId: "670e4a0655e53c8e6099fcf2h",
      userId: "670e4a9955e53c8e609cf174j",
      text: "",
    };
    const res: Response = await request(app).post("/comments").send(reqBody);

    const body = res.body as ErrorMessage;
    console.log(body);

    expect(body).toEqual({
      error: "Invalid article id; Invalid user id; Invalid comment text",
    });
  });
});
