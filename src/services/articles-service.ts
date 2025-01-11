import { Db, ObjectId, WithId } from "mongodb";
import { Article, ArticlesGetQuery } from "../types/models/article-types";
import { Pipeline } from "../types/primary-types";

export class ArticlesService {
  private collection;

  constructor(mongoDb: Db) {
    this.collection = mongoDb.collection<Article>("articles");
  }

  async getArticles({
    _expand,
    _sort,
    _page,
    _limit,
    _order,
    q,
    type,
  }: ArticlesGetQuery) {
    const pipeline: Pipeline = [];

    this.applyTypeFilter(pipeline, type);
    this.applySearchFilter(pipeline, q);
    this.applySorting(pipeline, _sort, _order);
    this.applyPagination(pipeline, _limit, _page);
    this.applyExpansion(pipeline, _expand);

    return await this.collection.aggregate<WithId<Article>>(pipeline).toArray();
  }

  async getArticleById(id: ObjectId) {
    return (await this.collection
      .aggregate([
        { $match: { _id: id } },
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

  private applyTypeFilter = (
    pipeline: Pipeline,
    type: ArticlesGetQuery["type"]
  ) => {
    if (type && type !== "ALL") {
      pipeline.push({
        $match: {
          type: type,
        },
      });
    }
  };

  private applySearchFilter = (
    pipeline: Pipeline,
    searchString: ArticlesGetQuery["q"]
  ) => {
    if (searchString) {
      pipeline.push({
        $match: {
          title: { $regex: searchString, $options: "i" },
        },
      });
    }
  };

  private applySorting = (
    pipeline: Pipeline,
    sort: ArticlesGetQuery["_sort"],
    order: ArticlesGetQuery["_order"]
  ) => {
    if (!sort) return;
    const sortOrder = order === "desc" ? -1 : 1;

    if (sort === "created") {
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

    if (sort === "title") {
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

    if (sort === "views") {
      pipeline.push({
        $sort: { views: sortOrder },
      });
    }
  };

  private applyPagination = (
    pipeline: Pipeline,
    limit: ArticlesGetQuery["_limit"],
    page: ArticlesGetQuery["_page"]
  ) => {
    if (!limit) return;

    const skip = page ? (Number(page) - 1) * Number(limit) : 0;
    pipeline.push({ $skip: skip }, { $limit: Number(limit) });
  };

  private applyExpansion = (
    pipeline: Pipeline,
    expand: ArticlesGetQuery["_expand"]
  ) => {
    if (expand === "user") {
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
  };
}
