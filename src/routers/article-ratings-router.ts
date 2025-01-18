import { NextFunction, Response, Router } from "express";
import { MessageWithEntityId } from "../types/messages-types";
import { RequestWithBody, RequestWithQuery } from "../types/primary-types";
import {
  getArticleRatingGetQueryValidator,
  getArticleRatingPostBodyValidator,
} from "../middlewares/inputValidators/articles-rating-validators";
import { inputValidationMiddleware } from "../middlewares/inputValidators/common-validators";
import { ArticleRatingsManager } from "../managers/article-ratings-manager";
import {
  ArticleRatingGetInputDTO,
  ArticleRatingGetOutputDTO,
  ArticleRatingPostInputDTO,
} from "../types/dtos/article-rating-dto";

export const getArticleRatingsRouter = (
  manager: ArticleRatingsManager
): Router => {
  const router = Router();

  router.get(
    "/",
    getArticleRatingGetQueryValidator(),
    inputValidationMiddleware,
    async (
      req: RequestWithQuery<ArticleRatingGetInputDTO>,
      res: Response<ArticleRatingGetOutputDTO | null>,
      next: NextFunction
    ) => {
      try {
        const articleRating = await manager.handleGetArticleRating(req);
        res.status(200).json(articleRating);
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    "/",
    getArticleRatingPostBodyValidator(),
    inputValidationMiddleware,
    async (
      req: RequestWithBody<ArticleRatingPostInputDTO>,
      res: Response<MessageWithEntityId>,
      next: NextFunction
    ) => {
      try {
        const postResult = await manager.handlePostArticleRating(req);
        res.status(201).json(postResult);
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};
