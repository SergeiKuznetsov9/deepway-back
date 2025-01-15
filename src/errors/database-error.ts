import { Errors } from "../constants/errors-constants";
import { AppError } from "./app-error";

export class DatabaseError extends AppError {
  constructor(message: string = Errors.InternalServer) {
    super(message, 500);
  }
}
