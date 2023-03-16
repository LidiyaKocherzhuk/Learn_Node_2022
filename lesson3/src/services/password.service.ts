import bcrypt from "bcrypt";

import { ApiError } from "../errors";

class PasswordService {
  public hash(password: string): Promise<string> {
    try {
      return bcrypt.hash(password, 10);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async compare(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      return bcrypt.compare(password, hashedPassword);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const passwordService = new PasswordService();
