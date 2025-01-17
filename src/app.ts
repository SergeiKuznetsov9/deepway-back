import express, { Express, Request, Response, NextFunction } from "express";
import { Db } from "mongodb";

import { getLoginRouter } from "./routers/login-router";
import { getArticleRouter } from "./routers/articles-router";
import { getProfileRouter } from "./routers/profile-router";
import { getArticleRatingsRouter } from "./routers/article-ratings-router";
import { getCommentsRouter } from "./routers/comments-router";
import { getNotificationsRouter } from "./routers/notifications-router";
import { ArticleRatingsService } from "./services/article-ratings-service";
import { ArticlesService } from "./services/articles-service";
import { CommentsService } from "./services/comments-service";
import { LoginService } from "./services/login-service";
import { NotificationsService } from "./services/notifications-service";
import { ProfileService } from "./services/profile-service";
import { ArticleRatingsManager } from "./managers/article-ratings-manager";
import { ArticlesManager } from "./managers/articles-manager";
import { CommentsManager } from "./managers/comments-manager";
import { LoginManager } from "./managers/login-manager";
import { ProfileManager } from "./managers/profile-manager";
import { NotificationsManager } from "./managers/notifications-manager";
import { UserService } from "./services/user-service";
import { UserManager } from "./managers/user-manager";
import { getUserRouter } from "./routers/user-router";
import { errorHandlerMiddleware } from "./middlewares/error-handler-middleware";
import { JwtService } from "./services/jwt-service";
import { getAuthMiddleware } from "./middlewares/auth-middleware";
import { getEmailRouter } from "./routers/email-router";
import { EmailService } from "./services/email-service";
import { EmailManager } from "./managers/email-manager";

export const createApp = (mongoDb: Db): Express => {
  const app: Express = express();
  const jwtService = new JwtService();

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
  // app.use(getAuthMiddleware(jwtService));

  app.get("/", (_, res: Response<string>) => {
    res.json("Deepway is runing");
  });

  const articleRatingsService = new ArticleRatingsService(mongoDb);
  const articleRatingsManager = new ArticleRatingsManager(
    articleRatingsService
  );
  app.use("/article-ratings", getArticleRatingsRouter(articleRatingsManager));

  const articlesService = new ArticlesService(mongoDb);
  const articlesManager = new ArticlesManager(articlesService);
  app.use("/articles", getArticleRouter(articlesManager));

  const commentsService = new CommentsService(mongoDb);
  const commentsManager = new CommentsManager(commentsService);
  app.use("/comments", getCommentsRouter(commentsManager));

  const loginService = new LoginService(mongoDb);
  const loginManager = new LoginManager(loginService);
  app.use("/login", getLoginRouter(loginManager));

  const userService = new UserService(mongoDb);
  const userManager = new UserManager(userService, jwtService);
  app.use("/user", getUserRouter(userManager));

  const profileService = new ProfileService(mongoDb);
  const profileManager = new ProfileManager(profileService);
  app.use("/profile", getProfileRouter(profileManager));

  const notificationsService = new NotificationsService(mongoDb);
  const notificationsManager = new NotificationsManager(notificationsService);
  app.use("/notifications", getNotificationsRouter(notificationsManager));

  const emailService = new EmailService();
  const emailManager = new EmailManager(emailService);
  app.use("/email", getEmailRouter(emailManager));

  app.use(errorHandlerMiddleware);

  return app;
};
