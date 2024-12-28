import express, { Express, Request, Response, NextFunction } from "express";
import { getLoginRouter } from "./routers/login-router";
import { getArticleRouter } from "./routers/articles-router";
import { getProfileRouter } from "./routers/profile-router";
import { getArticleRatingsRouter } from "./routers/article-ratings-router";
import { getCommentsRouter } from "./routers/comments-router";
import { getNotificationsRouter } from "./routers/notifications-router";
import { MongoClient } from "mongodb";
import { ArticleRatingsService } from "./services/article-ratings-service";
import { ArticlesService } from "./services/articles-service";
import { CommentsService } from "./services/comments-service";
import { LoginService } from "./services/login-service";
import { NotificationsService } from "./services/notifications-service";
import { ProfileService } from "./services/profile-service";

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

  app.use(
    "/articles",
    getArticleRouter(new ArticlesService(client, mongoDbName))
  );
  app.use(
    "/article-ratings",
    getArticleRatingsRouter(new ArticleRatingsService(client, mongoDbName))
  );
  app.use(
    "/comments",
    getCommentsRouter(new CommentsService(client, mongoDbName))
  );
  app.use("/login", getLoginRouter(new LoginService(client, mongoDbName)));
  app.use(
    "/profile",
    getProfileRouter(new ProfileService(client, mongoDbName))
  );
  app.use(
    "/notifications",
    getNotificationsRouter(new NotificationsService(client, mongoDbName))
  );

  return app;
};
