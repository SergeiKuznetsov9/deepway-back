import { ArticleBlock, ArticleType } from "../common/article-types";
import { User } from "../models/user-types";

export type ArticlesGetInputDTO = Partial<{
  _expand: "user";
  _sort: "created" | "title" | "views";
  _page: string;
  _limit: string;
  _order: "desc" | "asc";
  q: string;
  type: "ALL" | "IT" | "ECONOMICS" | "SCIENCE";
}>;

export type ArticleGetInputDTO = {
  id: string;
};

export type ArticleOutputDTO = {
  title: string;
  subtitle: string;
  img: string;
  views: number;
  createdAt: string;
  userId: string;
  type: ArticleType[];
  blocks: ArticleBlock[];
  user?: User;
};
