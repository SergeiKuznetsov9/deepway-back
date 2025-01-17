import { Errors } from "../constants/errors-constants";
import { AppError } from "./app-error";

export class SendEmailError extends AppError {
  constructor(message: string = Errors.Email) {
    super(message, 400);
  }
}
