import jwt from "jsonwebtoken";
import { AuthError } from "../errors/auth-error";
import { DecodedJWT } from "../types/primary-types";

const secret = process.env.JWT_SECRET || "123";

export class JwtService {
  createJWT = (userId: string) =>
    jwt.sign({ userId }, secret, { expiresIn: "8h" });

  verifyJWT = (token: string): DecodedJWT => {
    try {
      return jwt.verify(token, secret) as DecodedJWT;
    } catch (error) {
      throw new AuthError();
    }
  };
}
