import { RequestContext } from "./primary-types";

declare global {
  declare namespace Express {
    export interface Request {
      requestContext: RequestContext;
    }
  }
}
