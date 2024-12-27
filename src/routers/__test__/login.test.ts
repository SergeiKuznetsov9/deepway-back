import request from "supertest";
import { Db } from "mongodb";
import { createApp } from "../../app";
import { initTestDB } from "../../../jest.setup";
import { Response } from "supertest";
import { getUsersMocks } from "../../mocks/users";
import { User } from "../../types/models/user";

let app: ReturnType<typeof createApp>;
let db: Db;

beforeAll(async () => {
  ({ app, db } = await initTestDB());
  await db.collection("users").insertMany(getUsersMocks());
});

describe("Login API", () => {
  it("POST /login", async () => {
    const reqBody = {
      username: "admin",
      password: "123",
    };
    const res: Response = await request(app).post("/login").send(reqBody);
    const body = res.body as User;

    expect(body.username).toBe("admin");
    expect("password" in body).toBe(false);
  });

  it("POST /login", async () => {
    const reqBody = {
      username: "admin",
      password: "124",
    };
    const res: Response = await request(app).post("/login").send(reqBody);
    const body = res.body;

    expect(body).toEqual({
      error: "Пользователь с таким именем и паролем не существует",
    });
  });
});
