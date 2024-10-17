import express from "express";
import { client, runDb } from "./db";
import { WithId, Document, ObjectId } from "mongodb";

const app = express();
const port = process.env.PORT || 3000;

app.use((req: any, res: any, next) => {
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
    return res.sendStatus(204);
  }

  next();
});
const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

app.get("/", (req, res) => {
  res.json("Deepway is runing");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await client
      .db("deepway")
      .collection("users")
      .findOne({ username, password }, { projection: { password: 0 } });

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

app.get("/articles", async (req, res) => {
  let articles: WithId<Document>[] = [];

  const { _expand, _sort, _page, _limit, _order, q, type } = req.query;

  const pipeline: any[] = [];

  if (type) {
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
              onError: "Invalid id",
              onNull: null,
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
      .toArray()) as WithId<Document>[];
  } catch (error) {
    console.error("Ошибка чтения данных", error);
    res.status(500).json({ error: "Ошибка получения данных" });
    return;
  }

  res.json(articles);
});

app.get("/articles/:id", async (req, res) => {
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
                onError: "Invalid id",
                onNull: null,
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
      .next()) as WithId<Document>;
    res.json(article);
  } catch (error) {
    console.error("Ошибка чтения данных", error);
    res.status(500).json({ error: "Ошибка получения данных" });
  }
});

app.get("/profile/:username", async (req, res) => {
  const username = req.params.username;

  try {
    const profile = await client
      .db("deepway")
      .collection("profile")
      .findOne({ username });
    console.log(profile);
    res.json(profile);
  } catch (error) {
    console.error("Ошибка чтения данных", error);
    res.status(500).json({ error: "Ошибка получения данных" });
  }
});

app.put("/profile/:id", async (req: any, res: any) => {
  const {
    id,
    age,
    avatar,
    city,
    country,
    currency,
    first,
    lastname,
    username,
  } = req.body;

  try {
    const result = await client
      .db("deepway")
      .collection("profile")
      .updateOne(
        { _id: new ObjectId(id as string) },
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
      return res.status(404).json({ error: "Профиль не найден" });
    }

    res.status(200).json({ message: "Профиль обновлён" });
  } catch (error) {
    console.error("Ошибка обновления данных", error);
    res.status(500).json({ error: "Ошибка обновления данных" });
  }
});

app.get("/article-ratings", async (req: any, res: any) => {
  const { userId, articleId } = req.query;

  try {
    const articleRating = await client
      .db("deepway")
      .collection("article-ratings")
      .findOne({ userId, articleId });

    res.status(200).json(articleRating);
  } catch (error) {
    console.error("Ошибка получения данных", error);
    res.status(500).json({ error: "Ошибка получения данных" });
  }
});

app.post("/article-ratings", async (req, res) => {
  const { articleId, userId, rate, feedback } = req.body;
  const rating = { articleId, userId, rate, feedback };

  try {
    const result = await client
      .db("deepway")
      .collection("article-ratings")
      .insertOne(rating);

    res.status(201).json({ id: result.insertedId.toString() });
  } catch (error) {
    console.error("Ошибка сохранения данных", error);
    res.status(500).json({ error: "Ошибка сохранения данных" });
  }
});

app.get("/comments", async (req, res) => {
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
              onError: "Invalid id",
              onNull: null,
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
      .toArray()) as WithId<Document>[];
    res.json(comments);
  } catch (error) {
    console.error("Ошибка чтения данных", error);
    res.status(500).json({ error: "Ошибка получения данных" });
  }
});

app.post("/comments", async (req, res) => {
  const { articleId, userId, text } = req.body;

  try {
    const comment = { articleId, userId, text };
    const result = await client
      .db("deepway")
      .collection("comments")
      .insertOne(comment);

    res.status(201).json({ id: result.insertedId.toString() });
  } catch (error) {
    console.error("Ошибка сохранения данных", error);
    res.status(500).json({ error: "Ошибка сохранения данных" });
  }
});

const startApp = async () => {
  await runDb();
  app.listen(port, () => {
    console.log(`Deepway app is listening on port ${port}`);
  });
};

startApp();
