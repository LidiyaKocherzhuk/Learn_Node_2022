import * as jwt from "jsonwebtoken";

import { configs } from "../config";
import { ETokenType } from "../enums";
import { ApiError } from "../errors";
import { ITokenPair, ITokenPayload } from "../types";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, configs.SECRET_ACCESS_KEY, {
      expiresIn: configs.ACCESS_LIFE_TIME,
    });

    const refreshToken = jwt.sign(payload, configs.SECRET_REFRESH_KEY, {
      expiresIn: configs.REFRESH_LIFE_TIME,
    });

    return { accessToken, refreshToken };
  }

  public checkToken(token: string, tokenType = ETokenType.access) {
    try {
      let secret = "";

      switch (tokenType) {
        case "access":
          secret = configs.SECRET_ACCESS_KEY;
          break;
        case "refresh":
          secret = configs.SECRET_REFRESH_KEY;
          break;
      }

      return jwt.verify(token, secret);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const tokenService = new TokenService();
