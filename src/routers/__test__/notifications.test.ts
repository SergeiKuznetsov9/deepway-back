import request from "supertest";
import { Db } from "mongodb";
import { createApp } from "../../app";
import { initTestDB } from "../../../jest.setup";
import { Response } from "supertest";
import { Notification } from "../../types/models/notification-types";
import { getNotificationsMocks } from "../../mocks/notifications";
import { ErrorMessage } from "../../types/models/messages-types";

let app: ReturnType<typeof createApp>;
let db: Db;

beforeAll(async () => {
  ({ app, db } = await initTestDB());
  await db.collection("notifications").insertMany(getNotificationsMocks());
});

describe("Notifications API", () => {
  it("GET /notifications", async () => {
    const userId = "670e4a9955e53c8e609cf174";
    const res: Response = await request(app).get(`/notifications/${userId}`);
    const body = res.body as Notification[];

    const isCorrectNotifications = body.every(
      (notification: Notification) => notification.userId === userId
    );
    expect(isCorrectNotifications).toBe(true);
  });

  it("GET /notifications with invalid user ID", async () => {
    const userId = "670e4a9955e53c8e609cf174g";
    const res: Response = await request(app).get(`/notifications/${userId}`);
    const body = res.body as ErrorMessage;

    expect(body).toEqual({ error: "Invalid user id" });
  });
});
