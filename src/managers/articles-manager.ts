import {
  ArticleGetInputDTO,
  ArticleOutputDTO,
  ArticlesGetInputDTO,
} from "../types/dtos/article-dto";
import { ArticlesService } from "../services/articles-service";
import { RequestWithParams, RequestWithQuery } from "../types/primary-types";
import { ObjectId } from "mongodb";

export class ArticlesManager {
  private service;

  constructor(service: ArticlesService) {
    this.service = service;
  }

  async handleGetArticles(req: RequestWithQuery<ArticlesGetInputDTO>) {
    const articles = await this.service.getArticles(req.query);
    const articlesAdapted: ArticleOutputDTO[] = articles.map((article) => ({
      _id: article._id.toString(),
      title: article.title,
      subtitle: article.subtitle,
      img: article.img,
      views: article.views,
      createdAt: article.createdAt,
      userId: article.userId,
      type: article.type,
      blocks: article.blocks,
      user: article.user,
    }));

    return articlesAdapted;
  }

  async handleGetArticleById(req: RequestWithParams<ArticleGetInputDTO>) {
    const objectId = new ObjectId(req.params.id);
    const article = await this.service.getArticleById(objectId);
    if (article === null) {
      return null;
    }

    const articleAdapted: ArticleOutputDTO = {
      _id: article._id.toString(),
      title: article.title,
      subtitle: article.subtitle,
      img: article.img,
      views: article.views,
      createdAt: article.createdAt,
      userId: article.userId,
      type: article.type,
      blocks: article.blocks,
      user: article.user,
    };

    return articleAdapted;
  }
}
