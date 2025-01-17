import { ObjectId } from "mongodb";
import { User } from "../models/user-types";

export type CommentGetOutputDTO = {
  _id: ObjectId;
  text: string;
  articleId: string;
  userId: string;
  user?: User;
};

export type CommentGetInputDTO = {
  _expand?: "user";
  articleId: string;
};

export type CommentPostInputDTO = {
  text: string;
  articleId: string;
  userId: string;
};
