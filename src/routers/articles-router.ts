import { Response, Router } from "express";
import {
  Article,
  ArticleGetParams,
  ArticlesGetQuery,
} from "../types/models/article-types";
import { ErrorMessage } from "../types/models/messages-types";
import { RequestWithParams, RequestWithQuery } from "../types/primary-types";
import { ArticlesService } from "../services/articles-service";
import {
  getArticlesGetQueryValidator,
  getArticleGetParamsValidator,
} from "../middlewares/inputValidators/articles-validators";
import { inputValidationMiddleware } from "../middlewares/inputValidators/common-validators";

export const getArticleRouter = (articlesService: ArticlesService) => {
  const router = Router();

  router.get(
    "/",
    getArticlesGetQueryValidator(),
    inputValidationMiddleware,
    async (
      req: RequestWithQuery<ArticlesGetQuery>,
      res: Response<Article[] | ErrorMessage>
    ) => {
      try {
        const articles = await articlesService.getArticles(req.query);
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
      req: RequestWithParams<ArticleGetParams>,
      res: Response<Article | ErrorMessage>
    ) => {
      try {
        const article = await articlesService.getArticleById(req.params.id);
        res.json(article);
      } catch (error) {
        console.error("Ошибка чтения данных", error);
        res.status(500).json({ error: "Ошибка получения данных" });
      }
    }
  );

  return router;
};
