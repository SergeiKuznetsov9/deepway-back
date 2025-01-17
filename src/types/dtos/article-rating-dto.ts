export type ArticleRatingGetInputDTO = {
  articleId: string;
  userId: string;
};

export type ArticleRatingGetOutputDTO = {
  articleId: string;
  userId: string;
  rate: 1 | 2 | 3 | 4 | 5;
  feedback: string;
};

export type ArticleRatingPostInputDTO = {
  articleId: string;
  userId: string;
  rate: 1 | 2 | 3 | 4 | 5;
  feedback: string;
};
