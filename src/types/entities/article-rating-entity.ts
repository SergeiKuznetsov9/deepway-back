export type ArticleRatingEntity = {
  articleId: string;
  userId: string;
  rate: 1 | 2 | 3 | 4 | 5;
  feedback: string;
};
