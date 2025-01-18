import { ArticleBlock, ArticleType } from "../common/article-common-types";

export type ArticleEntity = {
  title: string;
  subtitle: string;
  img: string;
  views: number;
  createdAt: string;
  userId: string;
  type: ArticleType[];
  blocks: ArticleBlock[];
};
