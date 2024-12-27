import request from "supertest";
import { Db } from "mongodb";
import { createApp } from "../../app";
import { initTestDB } from "../../../jest.setup";
import { Response } from "supertest";
import { getProfilesMocks } from "../../mocks/profiles";
import { Profile } from "../../types/models/profile";

let app: ReturnType<typeof createApp>;
let db: Db;

beforeAll(async () => {
  ({ app, db } = await initTestDB());
  await db.collection("profile").insertMany(getProfilesMocks());
});

describe("Profile API", () => {
  it("GET /profile", async () => {
    const res: Response = await request(app).get(
      "/profile/670e4a9955e53c8e609cf176"
    );
    const body = res.body as Profile;
    expect(body.userId).toBe("670e4a9955e53c8e609cf176");
  });

  it("PUT /profile", async () => {
    const reqBody = {
      age: "Новое значение",
      avatar: "Новое значение",
      city: "Новое значение",
      country: "Новое значение",
      currency: "Новое значение",
      first: "Новое значение",
      lastname: "Новое значение",
      username: "Новое значение",
    };
    const res: Response = await request(app)
      .put("/profile/670e4a9955e53c8e609cf176")
      .send(reqBody);

    const updatedProfile = (await db
      .collection("profile")
      .findOne({ userId: "670e4a9955e53c8e609cf176" })) as Profile;

    const isAllUpdated = Object.entries(updatedProfile).every(
      (fieldWithData) => {
        if (fieldWithData[0] !== "userId" && fieldWithData[0] !== "_id") {
          return fieldWithData[1] === "Новое значение";
        }
        return true;
      }
    );
    expect(isAllUpdated).toBe(true);
  });
});
