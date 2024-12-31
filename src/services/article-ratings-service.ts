import { MongoClient } from "mongodb";
import {
  ArticleRating,
  ArticleRatingGetQuery,
  ArticleRatingPostBody,
} from "../types/models/article-rating";

export class ArticleRatingsService {
  private collection;

  constructor(client: MongoClient, dbName: string) {
    this.collection = client.db(dbName).collection("article-ratings");
  }

  async getArticleRating(articleRatingGetQuery: ArticleRatingGetQuery) {
    return (await this.collection.findOne(
      articleRatingGetQuery
    )) as ArticleRating;
  }

  async postArticleRating(articleRatingPostBody: ArticleRatingPostBody) {
    return await this.collection.insertOne(articleRatingPostBody);
  }
}
