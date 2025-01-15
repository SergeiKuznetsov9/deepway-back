import { Errors } from "../constants/errors-constants";
import { AppError } from "./app-error";

export class AuthError extends AppError {
  constructor(message: string = Errors.Auth) {
    super(message, 401);
  }
}
