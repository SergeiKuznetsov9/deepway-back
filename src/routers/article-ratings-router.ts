import { Response, Router } from "express";
import { WithId } from "mongodb";

import {
  ErrorMessage,
  MessageWithEntityId,
} from "../types/models/messages-types";
import { RequestWithBody, RequestWithQuery } from "../types/primary-types";
import {
  ArticleRating,
  ArticleRatingGetQuery,
} from "../types/models/article-rating-types";
import {
  getArticleRatingGetQueryValidator,
  getArticleRatingPostBodyValidator,
} from "../middlewares/inputValidators/articles-rating-validators";
import { inputValidationMiddleware } from "../middlewares/inputValidators/common-validators";
import { ArticleRatingsManager } from "../managers/article-ratings-manager";

export const getArticleRatingsRouter = (
  manager: ArticleRatingsManager
): Router => {
  const router = Router();

  router.get(
    "/",
    getArticleRatingGetQueryValidator(),
    inputValidationMiddleware,
    async (
      req: RequestWithQuery<ArticleRatingGetQuery>,
      res: Response<WithId<ArticleRating> | ErrorMessage | null>
    ) => {
      try {
        const articleRating = await manager.handleGetArticleRating(req);
        res.status(200).json(articleRating);
      } catch (error) {
        console.error("Ошибка получения данных", error);
        res.status(500).json({ error: "Ошибка получения данных" });
      }
    }
  );

  router.post(
    "/",
    getArticleRatingPostBodyValidator(),
    inputValidationMiddleware,
    async (
      req: RequestWithBody<ArticleRating>,
      res: Response<MessageWithEntityId | ErrorMessage>
    ) => {
      try {
        const postResult = await manager.handlePostArticleRating(req);
        res.status(201).json(postResult);
      } catch (error) {
        console.error("Ошибка сохранения данных", error);
        res.status(500).json({ error: "Ошибка сохранения данных" });
      }
    }
  );

  return router;
};
