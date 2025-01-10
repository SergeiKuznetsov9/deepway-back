import { MongoClient, ObjectId, WithId } from "mongodb";
import { Article, ArticlesGetQuery } from "../types/models/article-types";

export class ArticlesService {
  private collection;

  constructor(client: MongoClient, dbName: string) {
    this.collection = client.db(dbName).collection<Article>("articles");
  }

  async getArticles(requestQuery: ArticlesGetQuery) {
    const { _expand, _sort, _page, _limit, _order, q, type } = requestQuery;
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

    return await this.collection.aggregate<WithId<Article>>(pipeline).toArray();
  }

  async getArticleById(id: string) {
    return (await this.collection
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
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
  }
}
