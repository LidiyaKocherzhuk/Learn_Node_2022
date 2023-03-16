import { Response } from "express";

import { ApiError } from "../errors";
import { Token } from "../models/Token";
import { ILocals, ILogin } from "../types";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async login(res: Response) {
    try {
      const { userFromDB, clientData } = res.locals as ILocals<ILogin>;
      const { _id, name } = userFromDB;

      const comparePassword = await passwordService.compare(
        clientData.password,
        userFromDB.password
      );

      if (!comparePassword) {
        throw new ApiError("Email or password not valid!", 400);
      }

      const tokenPair = await tokenService.generateTokenPair({
        userId: _id,
        userName: name,
      });

      await Token.create({ ...tokenPair, userId: _id });

      return { user: userFromDB, tokenPair };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
