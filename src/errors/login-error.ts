import { Errors } from "../constants/errors-constants";
import { AppError } from "./app-error";

export class LoginError extends AppError {
  constructor(message: string = Errors.Login) {
    super(message, 401);
  }
}
