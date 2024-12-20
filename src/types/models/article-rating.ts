import { ObjectId } from "mongodb";

export type ArticleRating = {
  _id: ObjectId;
  articleId: string;
  userId: string;
  rate: 1 | 2 | 3 | 4 | 5;
  feedback: string;
};

export type ArticleRatingPostBody = Omit<ArticleRating, "_id">;

export type ArticleRatingGetQuery = {
  articleId: string;
  userId: string;
};
