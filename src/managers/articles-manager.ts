import {
  ArticleGetParams,
  ArticlesGetQuery,
} from "../types/models/article-types";
import { ArticlesService } from "../services/articles-service";
import { RequestWithParams, RequestWithQuery } from "../types/primary-types";
import { ObjectId } from "mongodb";

export class ArticlesManager {
  private service;

  constructor(service: ArticlesService) {
    this.service = service;
  }

  async handleGetArticles(req: RequestWithQuery<ArticlesGetQuery>) {
    return await this.service.getArticles(req.query);
  }

  async handleGetArticleById(req: RequestWithParams<ArticleGetParams>) {
    const objectId = new ObjectId(req.params.id);
    return await this.service.getArticleById(objectId);
  }
}
