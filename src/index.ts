import dotenv from "dotenv";
dotenv.config();

import { createApp } from "./app";
import { runDb } from "./db/db";

const port = process.env.PORT || 3000;
const mongoDbName = "deepway";

const startApp = async () => {
  const client = await runDb();
  const app = createApp(client, mongoDbName);
  app.listen(port, () => {
    console.log(`Deepway app is listening on port ${port}`);
  });
};

startApp();
