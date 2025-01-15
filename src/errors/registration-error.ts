import { Errors } from "../constants/errors-constants";
import { AppError } from "./app-error";

export class RegistrationError extends AppError {
  constructor(message: string = Errors.LoginConflict) {
    super(message, 409);
  }
}
