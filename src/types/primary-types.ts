import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Document } from "mongodb";

export type RequestWithParams<T> = Request<T>;
export type RequestWithBody<T> = Request<{}, {}, T>;
export type RequestWithParamsAndBody<T, B> = Request<T, {}, B>;
export type RequestWithQuery<T> = Request<{}, {}, {}, T>;

export type RequestContext = {
  userId: string;
};

export type DecodedJWT = JwtPayload & {
  userId: string;
};

type PipelineStage =
  | { $match?: Document }
  | { $sort?: Document }
  | { $project?: Document }
  | { $limit?: number }
  | { $skip?: number }
  | { $lookup?: Document }
  | { $unwind?: string | Document }
  | { $unset?: string[] }
  | { $addFields?: Document };

export type Pipeline = PipelineStage[];
