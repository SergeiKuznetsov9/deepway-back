import dotenv from "dotenv";
import { createApp } from "./src/app";
import { runDb } from "./src/db/db";
dotenv.config({ path: ".env.test" });

export const initTestDB = async () => {
  const mongoDb = await runDb();
  const app = createApp(mongoDb);

  return { app, db: mongoDb };
};
