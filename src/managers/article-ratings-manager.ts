import {
  ArticleRatingGetInputDTO,
  ArticleRatingGetOutputDTO,
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
    const articleRating = await this.service.getArticleRating(req.query);

    if (articleRating === null) {
      return null;
    }

    const articleRatingAdapted: ArticleRatingGetOutputDTO = {
      _id: articleRating._id.toString(),
      articleId: articleRating.articleId,
      userId: articleRating.userId,
      rate: articleRating.rate,
      feedback: articleRating.feedback,
    };

    return articleRatingAdapted;
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
