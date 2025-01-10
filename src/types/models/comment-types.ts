import { ObjectId } from "mongodb";
import { User } from "./user-types";

export type Comment = {
  _id: ObjectId;
  text: string;
  articleId: string;
  userId: string;
  user?: User;
};

export type CommentGetQuery = {
  _expand?: "user";
  articleId: string;
};

export type CommentPostBody = {
  text: string;
  articleId: string;
  userId: string;
};
