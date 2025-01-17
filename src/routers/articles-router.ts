import { Response, Router } from "express";
import { ErrorMessage } from "../types/models/messages-types";
import { RequestWithParams, RequestWithQuery } from "../types/primary-types";
import {
  getArticlesGetQueryValidator,
  getArticleGetParamsValidator,
} from "../middlewares/inputValidators/articles-validators";
import { inputValidationMiddleware } from "../middlewares/inputValidators/common-validators";
import { ArticlesManager } from "../managers/articles-manager";
import {
  ArticleGetInputDTO,
  ArticleOutputDTO,
  ArticlesGetInputDTO,
} from "../types/dtos/article-dto";

export const getArticleRouter = (manager: ArticlesManager) => {
  const router = Router();

  router.get(
    "/",
    getArticlesGetQueryValidator(),
    inputValidationMiddleware,
    async (
      req: RequestWithQuery<ArticlesGetInputDTO>,
      res: Response<ArticleOutputDTO[] | ErrorMessage>
    ) => {
      try {
        const articles = await manager.handleGetArticles(req);
        res.json(articles);
      } catch (error) {
        console.error("Ошибка чтения данных", error);
        res.status(500).json({ error: "Ошибка получения данных" });
      }
    }
  );

  router.get(
    "/:id",
    getArticleGetParamsValidator(),
    inputValidationMiddleware,
    async (
      req: RequestWithParams<ArticleGetInputDTO>,
      res: Response<ArticleOutputDTO | ErrorMessage>
    ) => {
      try {
        const article = await manager.handleGetArticleById(req);
        res.json(article);
      } catch (error) {
        console.error("Ошибка чтения данных", error);
        res.status(500).json({ error: "Ошибка получения данных" });
      }
    }
  );

  return router;
};
