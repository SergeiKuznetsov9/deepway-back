import { NextFunction, Response, Router } from "express";
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
      res: Response<ArticleOutputDTO[]>,
      next: NextFunction
    ) => {
      try {
        const articles = await manager.handleGetArticles(req);
        res.json(articles);
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    "/:id",
    getArticleGetParamsValidator(),
    inputValidationMiddleware,
    async (
      req: RequestWithParams<ArticleGetInputDTO>,
      res: Response<ArticleOutputDTO | null>,
      next: NextFunction
    ) => {
      try {
        const article = await manager.handleGetArticleById(req);
        res.json(article);
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};
