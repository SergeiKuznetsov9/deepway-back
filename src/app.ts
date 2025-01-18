import express, { Express, Request, Response, NextFunction } from "express";
import { Db } from "mongodb";

import { errorHandlerMiddleware } from "./middlewares/error-handler-middleware";
import { initServices } from "./services";
import { initManagers } from "./managers";
import { addRoutes } from "./routes";

export const createApp = (mongoDb: Db): Express => {
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
  // app.use(getAuthMiddleware(jwtService));

  app.get("/", (_, res: Response<string>) => {
    res.json("Deepway is runing");
  });

  const appServices = initServices(mongoDb);
  const appManagers = initManagers(appServices);
  addRoutes(app, appManagers);

  app.use(errorHandlerMiddleware);

  return app;
};
