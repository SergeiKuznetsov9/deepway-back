import { MongoClient } from "mongodb";
import {
  ArticleRating,
  ArticleRatingGetQuery,
} from "../types/models/article-rating-types";

export class ArticleRatingsService {
  private collection;

  constructor(client: MongoClient, dbName: string) {
    this.collection = client
      .db(dbName)
      .collection<ArticleRating>("article-ratings");
  }

  async getArticleRating(articleRatingGetQuery: ArticleRatingGetQuery) {
    return await this.collection.findOne(articleRatingGetQuery);
  }

  async postArticleRating(articleRatingPostBody: ArticleRating) {
    const postResult = await this.collection.insertOne(articleRatingPostBody);
    return { _id: postResult.insertedId.toString() };
  }
}
