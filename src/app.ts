import express, { Express, Request, Response, NextFunction } from "express";
import { getLoginRoutes } from "./routes/login";
import { addArticleRoutes } from "./routes/articles";
import { addProfileRoutes } from "./routes/profile";
import { addArticleRatingsRoutes } from "./routes/article-ratings";
import { addCommentsRoutes } from "./routes/comments";
import { addNotificationsRoutes } from "./routes/notifications";
import { client } from "./db";

export const app: Express = express();

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

const loginRoutes = getLoginRoutes(client);
app.use("/login", loginRoutes);

addArticleRoutes(app, client);
addProfileRoutes(app, client);
addArticleRatingsRoutes(app, client);
addCommentsRoutes(app, client);
addNotificationsRoutes(app, client);
