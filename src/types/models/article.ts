import { ObjectId } from "mongodb";
import { User } from "./user";

type ArticleType = "IT" | "ECONOMICS" | "SCIENCE";

enum ArticleBlockType {
  IMAGE = "IMAGE",
  CODE = "CODE",
  TEXT = "TEXT",
}

type ArticleBlockBase = {
  id: string;
  type: ArticleBlockType;
};

type ArticleCodeBlock = ArticleBlockBase & {
  type: ArticleBlockType.CODE;
  code: string;
};

type ArticleImageBlock = ArticleBlockBase & {
  type: ArticleBlockType.IMAGE;
  src: string;
  title: string;
};

type ArticleTextBlock = ArticleBlockBase & {
  type: ArticleBlockType.TEXT;
  title?: string;
  paragraphs: string[];
};

type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock;

export type Article = {
  _id: ObjectId;
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

export type ArticlesGetQuery = {
  _expand: string;
  _sort: string;
  _page: string;
  _limit: string;
  _order: string;
  q: string;
  type: string;
};

export type ArticleGetParams = {
  id: string;
};
