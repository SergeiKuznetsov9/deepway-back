import express, { Express, Request, Response, NextFunction } from "express";
import { client, runDb } from "./db";
import { WithId, Document, ObjectId } from "mongodb";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery,
} from "./types/types";
import {
  Article,
  ArticleGetParams,
  ArticlesGetQuery,
} from "./types/models/article";
import {
  ErrorMessage,
  MessageWithEntityId,
  SuccessMessage,
} from "./types/models/messages";
import { User } from "./types/models/user";
import {
  Profile,
  ProfileGetParams,
  ProfilePutBody,
  ProfilePutParams,
} from "./types/models/profile";
import {
  ArticleRating,
  ArticleRatingGetQuery,
  ArticleRatingPostBody,
} from "./types/models/article-rating";
import { CommentGetQuery, CommentPostBody } from "./types/models/comment";
import {
  Notification,
  NotificationGetParams,
} from "./types/models/notification";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use((req: Request, res: Response, next: NextFunction): void => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, Accept"
  );

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }

  next();
});

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

app.get("/", (_, res: Response<string>) => {
  res.json("Deepway is runing");
});

app.post("/login", async (req: Request, res: Response<User | ErrorMessage>) => {
  const { username, password } = req.body;

  try {
    const user = (await client
      .db("deepway")
      .collection("users")
      .findOne(
        { username, password },
        { projection: { password: 0 } }
      )) as User | null;

    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ error: "Пользователь с таким именем и паролем не существует" });
    }
  } catch (error) {
    console.error("Ошибка сохранения данных", error);
    res.status(500).json({ error: "Ошибка сохранения данных" });
  }
});

app.get(
  "/articles",
  async (
    req: RequestWithQuery<ArticlesGetQuery>,
    res: Response<Article[] | ErrorMessage>
  ) => {
    let articles = [];

    const { _expand, _sort, _page, _limit, _order, q, type } = req.query;

    const pipeline: any[] = [];

    if (type && type !== "ALL") {
      pipeline.push({
        $match: {
          type: type,
        },
      });
    }

    if (q) {
      pipeline.push({
        $match: {
          title: { $regex: q, $options: "i" },
        },
      });
    }

    if (_sort) {
      const sortOrder = _order === "desc" ? -1 : 1;

      if (_sort === "created") {
        pipeline.push(
          {
            $addFields: {
              parsedDate: {
                $dateFromString: {
                  dateString: "$createdAt",
                  format: "%d.%m.%Y",
                },
              },
            },
          },
          {
            $sort: { parsedDate: sortOrder },
          }
        );
      }

      if (_sort === "title") {
        pipeline.push(
          {
            $addFields: {
              titleLower: { $toLower: "$title" },
            },
          },
          {
            $sort: { titleLower: sortOrder },
          },
          {
            $project: {
              titleLower: 0,
            },
          }
        );
      }

      if (_sort === "views") {
        pipeline.push({
          $sort: { views: sortOrder },
        });
      }
    }

    if (_limit && !_page) {
      pipeline.push({
        $limit: Number(_limit),
      });
    }

    if (_limit && _page) {
      const skip = (Number(_page) - 1) * Number(_limit);
      pipeline.push({
        $skip: skip,
      });
      pipeline.push({
        $limit: Number(_limit),
      });
    }

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
        { $unset: ["user.password"] }
      );
    }

    try {
      articles = (await client
        .db("deepway")
        .collection("articles")
        .aggregate(pipeline)
        .toArray()) as Article[];
    } catch (error) {
      console.error("Ошибка чтения данных", error);
      res.status(500).json({ error: "Ошибка получения данных" });
      return;
    }

    res.json(articles);
  }
);

app.get(
  "/articles/:id",
  async (
    req: RequestWithParams<ArticleGetParams>,
    res: Response<Article | ErrorMessage>
  ) => {
    const requestedId = req.params.id;

    try {
      const article = (await client
        .db("deepway")
        .collection("articles")
        .aggregate([
          { $match: { _id: new ObjectId(requestedId) } },
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
          { $unset: ["userIdObject", "user.password"] },
        ])
        .next()) as Article;
      res.json(article);
    } catch (error) {
      console.error("Ошибка чтения данных", error);
      res.status(500).json({ error: "Ошибка получения данных" });
    }
  }
);

app.get(
  "/profile/:userId",
  async (
    req: RequestWithParams<ProfileGetParams>,
    res: Response<Profile | ErrorMessage>
  ) => {
    const userId = req.params.userId;

    try {
      const profile = (await client
        .db("deepway")
        .collection("profile")
        .findOne({ userId })) as Profile;
      res.json(profile);
    } catch (error) {
      console.error("Ошибка чтения данных", error);
      res.status(500).json({ error: "Ошибка получения данных" });
    }
  }
);

app.put(
  "/profile/:userId",
  async (
    req: RequestWithParamsAndBody<ProfilePutParams, ProfilePutBody>,
    res: Response<ErrorMessage | SuccessMessage>
  ): Promise<void> => {
    const { age, avatar, city, country, currency, first, lastname, username } =
      req.body;

    try {
      const userId = req.params.userId;

      const result = await client.db("deepway").collection("profile").updateOne(
        { userId },
        {
          $set: {
            first,
            lastname,
            age,
            currency,
            country,
            city,
            username,
            avatar,
          },
        }
      );
      if (result.matchedCount === 0) {
        res.status(404).json({ error: "Профиль не найден" });
        return;
      }

      res.status(200).json({ message: "Профиль обновлён" });
    } catch (error) {
      console.error("Ошибка обновления данных", error);
      res.status(500).json({ error: "Ошибка обновления данных" });
    }
  }
);

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

app.get(
  "/notifications/:userId",
  async (
    req: RequestWithParams<NotificationGetParams>,
    res: Response<Notification[] | ErrorMessage>
  ) => {
    const { userId } = req.params;

    try {
      const notifications = (await client
        .db("deepway")
        .collection("notifications")
        .find({ userId })
        .toArray()) as Notification[];

      res.json(notifications);
    } catch (error) {
      console.error("Ошибка чтения данных", error);
      res.status(500).json({ error: "Ошибка получения данных" });
    }
  }
);

const startApp = async () => {
  await runDb();
  app.listen(port, () => {
    console.log(`Deepway app is listening on port ${port}`);
  });
};

startApp();
