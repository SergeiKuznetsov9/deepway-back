import { UserCredentials } from "../types/models/user-types";
import { LoginService } from "../services/login-service";
import { RequestWithBody } from "../types/primary-types";

export class LoginManager {
  private service;

  constructor(service: LoginService) {
    this.service = service;
  }

  async handleGetUser(req: RequestWithBody<UserCredentials>) {
    return await this.service.getUser(req.body);
  }
}
