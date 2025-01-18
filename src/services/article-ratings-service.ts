import { Db } from "mongodb";
import {
  ArticleRatingGetInputDTO,
  ArticleRatingPostInputDTO,
} from "../types/dtos/article-rating-dto";
import { ArticleRatingEntity } from "../types/entities/article-rating-entity";
import { Errors } from "../constants/errors-constants";
import { DatabaseError } from "../errors/database-error";

export class ArticleRatingsService {
  private collection;

  constructor(mongoDb: Db) {
    this.collection =
      mongoDb.collection<ArticleRatingEntity>("article-ratings");
  }

  async getArticleRating(articleRatingGetQuery: ArticleRatingGetInputDTO) {
    try {
      return await this.collection.findOne(articleRatingGetQuery);
    } catch (error) {
      console.error(Errors.DBGet, error);
      throw new DatabaseError(Errors.DBGet);
    }
  }

  async postArticleRating(articleRatingPostBody: ArticleRatingPostInputDTO) {
    try {
      return await this.collection.insertOne(articleRatingPostBody);
    } catch (error) {
      console.error(Errors.DBInsert, error);
      throw new DatabaseError(Errors.DBInsert);
    }
  }
}
