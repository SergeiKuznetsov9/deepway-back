import express, { Express, Request, Response, NextFunction } from "express";
import { getLoginRoutes } from "./routes/login";
import { getArticleRoutes } from "./routes/articles";
import { getProfileRoutes } from "./routes/profile";
import { getArticleRatingsRoutes } from "./routes/article-ratings";
import { getCommentsRoutes } from "./routes/comments";
import { getNotificationsRoutes } from "./routes/notifications";
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

  app.use("/login", getLoginRoutes(client, mongoDbName));
  app.use("/articles", getArticleRoutes(client, mongoDbName));
  app.use("/profile", getProfileRoutes(client, mongoDbName));
  app.use("/article-ratings", getArticleRatingsRoutes(client, mongoDbName));
  app.use("/comments", getCommentsRoutes(client, mongoDbName));
  app.use("/notifications", getNotificationsRoutes(client, mongoDbName));

  return app;
};
