import express, { Express, Request, Response, NextFunction } from "express";
import { getLoginRouter } from "./routers/login";
import { getArticleRouter } from "./routers/articles";
import { getProfileRouter } from "./routers/profile";
import { getArticleRatingsRouter } from "./routers/article-ratings";
import { getCommentsRouter } from "./routers/comments";
import { getNotificationsRouter } from "./routers/notifications";
import { MongoClient } from "mongodb";

export const createApp = (
  client: MongoClient,
  mongoDbName: string
): Express => {
  const app: Express = express();
  app.use((req: Request, res: Response, next: NextFunction): void => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With, Accept"
    );

    if (req.method === "OPTIONS") {
      res.sendStatus(204);
      return;
    }

    next();
  });

  const jsonBodyMiddleware = express.json();
  app.use(jsonBodyMiddleware);

  app.get("/", (_, res: Response<string>) => {
    res.json("Deepway is runing");
  });

  app.use("/login", getLoginRouter(client, mongoDbName));
  app.use("/articles", getArticleRouter(client, mongoDbName));
  app.use("/profile", getProfileRouter(client, mongoDbName));
  app.use("/article-ratings", getArticleRatingsRouter(client, mongoDbName));
  app.use("/comments", getCommentsRouter(client, mongoDbName));
  app.use("/notifications", getNotificationsRouter(client, mongoDbName));

  return app;
};
