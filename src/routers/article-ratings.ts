import { Response, Router } from "express";
import { MongoClient } from "mongodb";

import { ErrorMessage, MessageWithEntityId } from "../types/models/messages";
import { RequestWithBody, RequestWithQuery } from "../types/types";
import {
  ArticleRating,
  ArticleRatingGetQuery,
  ArticleRatingPostBody,
} from "../types/models/article-rating";

export const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

export const getArticleRatingsRouter = (
  client: MongoClient,
  mongoDbName: string
) => {
  const router = Router();

  router.get(
    "/",
    async (
      req: RequestWithQuery<ArticleRatingGetQuery>,
      res: Response<ArticleRating | ErrorMessage>
    ) => {
      const { userId, articleId } = req.query;

      try {
        const articleRating = (await client
          .db(mongoDbName)
          .collection("article-ratings")
          .findOne({ userId, articleId })) as ArticleRating;

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
      const { articleId, userId, rate, feedback } = req.body;
      const rating = { articleId, userId, rate, feedback };

      try {
        const result = await client
          .db(mongoDbName)
          .collection("article-ratings")
          .insertOne(rating);

        res.status(201).json({ _id: result.insertedId.toString() });
      } catch (error) {
        console.error("Ошибка сохранения данных", error);
        res.status(500).json({ error: "Ошибка сохранения данных" });
      }
    }
  );

  return router;
};