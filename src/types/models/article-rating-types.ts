export type ArticleRating = {
  articleId: string;
  userId: string;
  rate: 1 | 2 | 3 | 4 | 5;
  feedback: string;
};

export type ArticleRatingGetQuery = {
  articleId: string;
  userId: string;
};
