import bcrypt from "bcrypt";
import { RequestWithBody } from "../types/primary-types";
import { UserService } from "../services/user-service";
import { JwtService } from "../services/jwt-service";
import {
  UserPostInputDTO,
  UserLoginInputDTO,
  UserLoginOutputDTO,
} from "../types/dtos/user-dto";
import { RegistrationError } from "../errors/registration-error";
import { Errors } from "../constants/errors-constants";
import { AuthError } from "../errors/auth-error";

export class UserManager {
  private userService;
  private jwtService;

  constructor(userService: UserService, jwtService: JwtService) {
    this.userService = userService;
    this.jwtService = jwtService;
  }

  async handlePostUser(req: RequestWithBody<UserPostInputDTO>) {
    const { login, password } = req.body;

    const userFromDb = await this.userService.getUserByLogin(login);
    if (userFromDb !== null) {
      throw new RegistrationError(Errors.LoginConflict);
    }

    const passwordSalt = await bcrypt.genSalt(12);
    const passwordHash = await this.generateHash(password, passwordSalt);

    const userEntity = {
      login,
      passwordHash,
      passwordSalt,
      createdAt: new Date(),
      roles: [],
      features: {},
    };

    const postResult = await this.userService.postUser(userEntity);
    return { _id: postResult.insertedId.toString() };
  }

  async checkCredentials(req: RequestWithBody<UserLoginInputDTO>) {
    const { login, password } = req.body;
    const userFromDb = await this.userService.getUserByLogin(login);

    if (!userFromDb) {
      throw new AuthError(Errors.Login);
    }

    const passwordSalt = userFromDb.passwordSalt;
    const passwordHash = userFromDb.passwordHash;

    const inputPasswordHash = await this.generateHash(password, passwordSalt);

    if (passwordHash !== inputPasswordHash) {
      throw new AuthError(Errors.Login);
    }

    const { _id, login: loginFromDb, createdAt, roles, features } = userFromDb;
    const userId = _id.toString();
    const token = this.jwtService.createJWT(userId);

    const userLoginOutputDTO: UserLoginOutputDTO = {
      _id: userId,
      login: loginFromDb,
      createdAt,
      roles,
      features,
      token,
    };

    return userLoginOutputDTO;
  }

  private async generateHash(password: string, salt: string) {
    return await bcrypt.hash(password, salt);
  }
}
