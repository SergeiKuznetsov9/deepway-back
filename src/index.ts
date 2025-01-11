import dotenv from "dotenv";
dotenv.config();

import { runDb } from "./db/db";
import { createApp } from "./app";

const port = process.env.PORT || 3000;

const startApp = async () => {
  const mongoDb = await runDb();
  const app = createApp(mongoDb);
  app.listen(port, () => {
    console.log(`Deepway app is listening on port ${port}`);
  });
};

startApp();
