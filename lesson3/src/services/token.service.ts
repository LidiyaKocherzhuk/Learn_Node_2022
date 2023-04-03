import * as jwt from "jsonwebtoken";

import { configs } from "../config";
import { ETokenTypes } from "../enums";
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

  public generateActionToken(
    payload: ITokenPayload,
    tokenType: ETokenTypes
  ): string {
    let actionToken = "";

    switch (tokenType) {
      case "activate":
        actionToken = jwt.sign(payload, configs.SECRET_ACTIVATE_KEY, {
          expiresIn: configs.ACTION_LIFE_TIME,
        });
        break;
      case "forgot":
        actionToken = jwt.sign(payload, configs.SECRET_FORGOT_KEY, {
          expiresIn: configs.ACTION_LIFE_TIME,
        });
        break;
    }

    return actionToken;
  }

  public checkToken(token: string, tokenType: ETokenTypes) {
    try {
      let secret = "";

      switch (tokenType) {
        case "access":
          secret = configs.SECRET_ACCESS_KEY;
          break;
        case "refresh":
          secret = configs.SECRET_REFRESH_KEY;
          break;
        case "activate":
          secret = configs.SECRET_ACTIVATE_KEY;
          break;
        case "forgot":
          secret = configs.SECRET_FORGOT_KEY;
          break;
      }

      return jwt.verify(token, secret);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const tokenService = new TokenService();
