import request from "supertest";
import { Db, ObjectId } from "mongodb";
import { createApp } from "../../app";
import { initTestDB } from "../../../jest.setup";
import { Response } from "supertest";
import { getProfilesMocks } from "../../mocks/profiles";
import { Profile } from "../../types/models/profile";
import { ErrorMessage } from "../../types/models/messages";

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

  it("GET /profile with invalid user ID", async () => {
    const res: Response = await request(app).get(
      "/profile/670e4a9955e53c8e609cf176h"
    );
    const body = res.body as ErrorMessage;
    expect(body).toEqual({ error: "Invalid user id" });
  });

  it("PUT /profile", async () => {
    const reqBody = {
      age: "14",
      avatar: "https://newVal",
      city: "Новое значение",
      country: "Новое значение",
      currency: "НЗН",
      first: "Новое значение",
      lastname: "Новое значение",
      username: "Новое значение",
    };
    await request(app).put("/profile/670e4b2c55e53c8e609fe55b").send(reqBody);

    const updatedProfile = (await db
      .collection("profile")
      .findOne({ _id: new ObjectId("670e4b2c55e53c8e609fe55b") })) as Profile;

    expect(updatedProfile.first).toBe("Новое значение");
    expect(updatedProfile.lastname).toBe("Новое значение");
    expect(updatedProfile.country).toBe("Новое значение");
    expect(updatedProfile.city).toBe("Новое значение");
    expect(updatedProfile.username).toBe("Новое значение");
    expect(updatedProfile.avatar).toBe("https://newVal");
    expect(updatedProfile.age).toBe("14");
    expect(updatedProfile.currency).toBe("НЗН");
    expect(updatedProfile.userId).toBe("670e4a9955e53c8e609cf176");
  });

  it("PUT /profile with invalid data", async () => {
    const reqBody = {
      age: "5",
      avatar: "htt://newVal",
      city: "Значение включающее более 32 символов",
      country: "Значение включающее более 32 символов",
      currency: "4Сим",
      first: "Значение включающее более 32 символов",
      lastname: "Значение включающее более 32 символов",
      username: "Значение включающее более 32 символов",
    };
    const res = await request(app)
      .put("/profile/670e4b2c55e53c8e609fe55bk")
      .send(reqBody);
    const body = res.body as ErrorMessage;
    expect(body).toEqual({
      error:
        "Invalid user id; Invalid age; Invalid avatar; Invalid city; Invalid country; Invalid currency; Invalid first; Invalid lastname; Invalid username",
    });
  });
});
