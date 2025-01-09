import dotenv from "dotenv";
import { createApp } from "./src/app";
import { runDb } from "./src/db/db";
dotenv.config({ path: ".env.test" });

export const initTestDB = async () => {
  const client = await runDb();
  const app = createApp(client, "deepway_test");
  const db = client.db("deepway_test");

  return { app, db };
};
