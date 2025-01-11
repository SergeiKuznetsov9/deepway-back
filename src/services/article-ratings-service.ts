import { Db } from "mongodb";
import {
  ArticleRating,
  ArticleRatingGetQuery,
} from "../types/models/article-rating-types";

export class ArticleRatingsService {
  private collection;

  constructor(mongoDb: Db) {
    this.collection = mongoDb.collection<ArticleRating>("article-ratings");
  }

  async getArticleRating(articleRatingGetQuery: ArticleRatingGetQuery) {
    return await this.collection.findOne(articleRatingGetQuery);
  }

  async postArticleRating(articleRatingPostBody: ArticleRating) {
    const postResult = await this.collection.insertOne(articleRatingPostBody);
    return { _id: postResult.insertedId.toString() };
  }
}
