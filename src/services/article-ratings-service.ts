import { Db } from "mongodb";
import {
  ArticleRatingGetInputDTO,
  ArticleRatingPostInputDTO,
} from "../types/dtos/article-rating-dto";
import { ArticleRatingEntity } from "../types/entities/article-rating-entity";

export class ArticleRatingsService {
  private collection;

  constructor(mongoDb: Db) {
    this.collection =
      mongoDb.collection<ArticleRatingEntity>("article-ratings");
  }

  async getArticleRating(articleRatingGetQuery: ArticleRatingGetInputDTO) {
    return await this.collection.findOne(articleRatingGetQuery);
  }

  async postArticleRating(articleRatingPostBody: ArticleRatingPostInputDTO) {
    return await this.collection.insertOne(articleRatingPostBody);
  }
}
