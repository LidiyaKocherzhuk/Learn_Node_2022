import { Response } from "express";

import { ApiError } from "../errors";
import { TokenModel } from "../models";
import { ILocals, ILogin, ITokenPair, IUser } from "../types";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async login(res: Response): Promise<ITokenPair> {
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
        _user_id: _id,
        userName: name,
      });

      await TokenModel.create({ ...tokenPair, _user_id: _id });

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refresh(res: Response) {
    try {
      const { jwtPayload, tokenInfo } = res.locals as ILocals<IUser>;
      const { _user_id, userName } = jwtPayload;

      const tokenPair = await tokenService.generateTokenPair({
        _user_id,
        userName,
      });

      await Promise.all([
        TokenModel.create({ ...tokenPair, _user_id }),
        TokenModel.deleteOne({ _id: tokenInfo._id }),
      ]);

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
