import { Response, Router } from "express";
import {
  Article,
  ArticleGetParams,
  ArticlesGetQuery,
} from "../types/models/article";
import { ErrorMessage } from "../types/models/messages";
import { RequestWithParams, RequestWithQuery } from "../types/types";
import { ArticlesService } from "../services/articles-service";

export const getArticleRouter = (articlesService: ArticlesService) => {
  const router = Router();

  router.get(
    "/",
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
