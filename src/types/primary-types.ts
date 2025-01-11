import { Request } from "express";
import { Document } from "mongodb";

export type RequestWithParams<T> = Request<T>;
export type RequestWithBody<T> = Request<{}, {}, T>;
export type RequestWithParamsAndBody<T, B> = Request<T, {}, B>;
export type RequestWithQuery<T> = Request<{}, {}, {}, T>;

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
