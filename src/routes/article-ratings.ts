import { Express, Response } from "express";
import { MongoClient } from "mongodb";

import { ErrorMessage, MessageWithEntityId } from "../types/models/messages";
import { RequestWithBody, RequestWithQuery } from "../types/types";
import {
  ArticleRating,
  ArticleRatingGetQuery,
  ArticleRatingPostBody,
} from "../types/models/article-rating";

export const addArticleRatingsRoutes = (app: Express, client: MongoClient) => {
  app.get(
    "/article-ratings",
    async (
      req: RequestWithQuery<ArticleRatingGetQuery>,
      res: Response<ArticleRating | ErrorMessage>
    ) => {
      const { userId, articleId } = req.query;

      try {
        const articleRating = (await client
          .db("deepway")
          .collection("article-ratings")
          .findOne({ userId, articleId })) as ArticleRating;

        res.status(200).json(articleRating);
      } catch (error) {
        console.error("Ошибка получения данных", error);
        res.status(500).json({ error: "Ошибка получения данных" });
      }
    }
  );

  app.post(
    "/article-ratings",
    async (
      req: RequestWithBody<ArticleRatingPostBody>,
      res: Response<MessageWithEntityId | ErrorMessage>
    ) => {
      const { articleId, userId, rate, feedback } = req.body;
      const rating = { articleId, userId, rate, feedback };

      try {
        const result = await client
          .db("deepway")
          .collection("article-ratings")
          .insertOne(rating);

        res.status(201).json({ _id: result.insertedId.toString() });
      } catch (error) {
        console.error("Ошибка сохранения данных", error);
        res.status(500).json({ error: "Ошибка сохранения данных" });
      }
    }
  );
};
