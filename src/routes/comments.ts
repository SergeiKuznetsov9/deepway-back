import { Express, Response } from "express";
import { MongoClient } from "mongodb";

import { ErrorMessage, MessageWithEntityId } from "../types/models/messages";
import { RequestWithBody, RequestWithQuery } from "../types/types";
import { CommentGetQuery, CommentPostBody } from "../types/models/comment";

export const addCommentsRoutes = (app: Express, client: MongoClient) => {
  app.get(
    "/comments",
    async (
      req: RequestWithQuery<CommentGetQuery>,
      res: Response<Comment[] | ErrorMessage>
    ) => {
      const { _expand, articleId } = req.query;
      const pipeline: any[] = [{ $match: { articleId: articleId } }];

      if (_expand === "user") {
        pipeline.push(
          {
            $addFields: {
              userIdObject: {
                $convert: {
                  input: "$userId",
                  to: "objectId",
                },
              },
            },
          },

          {
            $lookup: {
              from: "users",
              localField: "userIdObject",
              foreignField: "_id",
              as: "user",
            },
          },
          { $unwind: "$user" },
          { $unset: ["userIdObject", "user.password"] }
        );
      }

      try {
        const comments = (await client
          .db("deepway")
          .collection("comments")
          .aggregate(pipeline)
          .toArray()) as Comment[];
        res.json(comments);
      } catch (error) {
        console.error("Ошибка чтения данных", error);
        res.status(500).json({ error: "Ошибка получения данных" });
      }
    }
  );

  app.post(
    "/comments",
    async (
      req: RequestWithBody<CommentPostBody>,
      res: Response<MessageWithEntityId | ErrorMessage>
    ) => {
      const { articleId, userId, text } = req.body;

      try {
        const comment = { articleId, userId, text };
        const result = await client
          .db("deepway")
          .collection("comments")
          .insertOne(comment);

        res.status(201).json({ _id: result.insertedId.toString() });
      } catch (error) {
        console.error("Ошибка сохранения данных", error);
        res.status(500).json({ error: "Ошибка сохранения данных" });
      }
    }
  );
};
