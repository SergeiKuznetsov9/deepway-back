export type ArticleType = "IT" | "ECONOMICS" | "SCIENCE";

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

export type ArticleBlock =
  | ArticleCodeBlock
  | ArticleImageBlock
  | ArticleTextBlock;
