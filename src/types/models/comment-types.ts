import { User } from "./user-types";

export type Comment = {
  text: string;
  articleId: string;
  userId: string;
  user?: User;
};

export type CommentGetQuery = {
  _expand?: "user";
  articleId: string;
};

export type CommentPostBody = Omit<Comment, "user">;
