import dotenv from "dotenv";
import { createApp } from "./src/app";
import { runDb } from "./src/db/db";
dotenv.config({ path: ".env.test" });

const mongoDbName = process.env.MONGO_DB_NAME || "";

export const initTestDB = async () => {
  const client = await runDb();
  const app = createApp(client, mongoDbName);
  const db = client.db(mongoDbName);

  return { app, db };
};