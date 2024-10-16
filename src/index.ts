import express from "express";
import { client, runDb } from "./db";
import { WithId, Document } from "mongodb";

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
    pipeline.push({
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "id",
        as: "user",
      },
    });
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
  }

  res.json(articles);
});

const startApp = async () => {
  await runDb();
  app.listen(port, () => {
    console.log(`Deepway app is listening on port ${port}`);
  });
};

startApp();
