import {
  ArticleRatingGetInputDTO,
  ArticleRatingPostInputDTO,
} from "../types/dtos/article-rating-dto";
import { ArticleRatingsService } from "../services/article-ratings-service";
import { RequestWithBody, RequestWithQuery } from "../types/primary-types";

export class ArticleRatingsManager {
  private service;

  constructor(service: ArticleRatingsService) {
    this.service = service;
  }

  async handleGetArticleRating(
    req: RequestWithQuery<ArticleRatingGetInputDTO>
  ) {
    return await this.service.getArticleRating(req.query);
  }

  async handlePostArticleRating(
    req: RequestWithBody<ArticleRatingPostInputDTO>
  ) {
    const postResult = await this.service.postArticleRating(req.body);
    if (!postResult || !postResult.insertedId) {
      throw new Error("Не удалось сохранить оценку");
    }
    return { _id: postResult.insertedId.toString() };
  }
}
