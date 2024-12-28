import { Response, Router } from "express";

import { ErrorMessage, MessageWithEntityId } from "../types/models/messages";
import { RequestWithBody, RequestWithQuery } from "../types/types";
import {
  ArticleRating,
  ArticleRatingGetQuery,
  ArticleRatingPostBody,
} from "../types/models/article-rating";
import { ArticleRatingsService } from "../services/article-ratings-service";

export const getArticleRatingsRouter = (
  articleRatingsService: ArticleRatingsService
): Router => {
  const router = Router();

  router.get(
    "/",
    async (
      req: RequestWithQuery<ArticleRatingGetQuery>,
      res: Response<ArticleRating | ErrorMessage>
    ) => {
      try {
        const articleRating = await articleRatingsService.getArticleRating(
          req.query
        );
        res.status(200).json(articleRating);
      } catch (error) {
        console.error("Ошибка получения данных", error);
        res.status(500).json({ error: "Ошибка получения данных" });
      }
    }
  );

  router.post(
    "/",
    async (
      req: RequestWithBody<ArticleRatingPostBody>,
      res: Response<MessageWithEntityId | ErrorMessage>
    ) => {
      try {
        const postResult = await articleRatingsService.postArticleRating(
          req.body
        );
        res.status(201).json({ _id: postResult.insertedId.toString() });
      } catch (error) {
        console.error("Ошибка сохранения данных", error);
        res.status(500).json({ error: "Ошибка сохранения данных" });
      }
    }
  );

  return router;
};
