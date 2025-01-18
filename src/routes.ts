import { Express } from "express";
import { initManagers } from "./managers";
import { getArticleRatingsRouter } from "./routers/article-ratings-router";
import { getArticleRouter } from "./routers/articles-router";
import { getCommentsRouter } from "./routers/comments-router";
import { getEmailRouter } from "./routers/email-router";
import { getLoginRouter } from "./routers/login-router";
import { getNotificationsRouter } from "./routers/notifications-router";
import { getProfileRouter } from "./routers/profile-router";
import { getUserRouter } from "./routers/user-router";

export const addRoutes = (
  app: Express,
  appManagers: ReturnType<typeof initManagers>
) => {
  const {
    articleRatingsManager,
    articlesManager,
    commentsManager,
    loginManager,
    userManager,
    profileManager,
    notificationsManager,
    emailManager,
  } = appManagers;

  app.use("/article-ratings", getArticleRatingsRouter(articleRatingsManager));
  app.use("/articles", getArticleRouter(articlesManager));
  app.use("/comments", getCommentsRouter(commentsManager));
  app.use("/login", getLoginRouter(loginManager));
  app.use("/user", getUserRouter(userManager));
  app.use("/profile", getProfileRouter(profileManager));
  app.use("/notifications", getNotificationsRouter(notificationsManager));
  app.use("/email", getEmailRouter(emailManager));
};
