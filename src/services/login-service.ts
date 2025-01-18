import { Db } from "mongodb";
import { User, UserCredentials } from "../types/models/user-types";
import { DatabaseError } from "../errors/database-error";
import { Errors } from "../constants/errors-constants";

export class LoginService {
  private collection;

  constructor(mongoDb: Db) {
    this.collection = mongoDb.collection<User>("users");
  }

  async getUser(userData: UserCredentials) {
    try {
      return await this.collection.findOne(userData, {
        projection: { password: 0 },
      });
    } catch (error) {
      console.error(Errors.DBGet, error);
      throw new DatabaseError(Errors.DBGet);
    }
  }
}
