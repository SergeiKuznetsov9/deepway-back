import {
  ArticleRating,
  ArticleRatingGetQuery,
} from "../types/models/article-rating-types";
import { ArticleRatingsService } from "../services/article-ratings-service";
import { RequestWithBody, RequestWithQuery } from "../types/primary-types";

export class ArticleRatingsManager {
  private service;

  constructor(service: ArticleRatingsService) {
    this.service = service;
  }

  async handleGetArticleRating(req: RequestWithQuery<ArticleRatingGetQuery>) {
    return await this.service.getArticleRating(req.query);
  }

  async handlePostArticleRating(req: RequestWithBody<ArticleRating>) {
    const postResult = await this.service.postArticleRating(req.body);
    return { _id: postResult.insertedId.toString() };
  }
}
