import { Db } from "mongodb";
import { User, UserCredentials } from "../types/models/user-types";

export class LoginService {
  private collection;

  constructor(mongoDb: Db) {
    this.collection = mongoDb.collection<User>("users");
  }

  async getUser(userData: UserCredentials) {
    return await this.collection.findOne(userData, {
      projection: { password: 0 },
    });
  }
}
