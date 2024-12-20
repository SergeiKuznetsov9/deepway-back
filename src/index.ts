import { app } from "./app";
import { runDb } from "./db";

const port = process.env.PORT || 3000;

const startApp = async () => {
  await runDb();
  app.listen(port, () => {
    console.log(`Deepway app is listening on port ${port}`);
  });
};

startApp();
