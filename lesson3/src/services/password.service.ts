import bcrypt from "bcrypt";

import { ApiError } from "../errors";

class PasswordService {
  public async hash(password: string) {
    const hashPassword = bcrypt.hash(password, 10);
    console.log(hashPassword);
    return hashPassword;
    try {
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async compare() {
    try {
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const passwordService = new PasswordService();
