import { NextFunction, Request, Response } from "express";

import { ETokenTypes } from "../enums";
import { ApiError } from "../errors";
import { Action, Token } from "../models";
import { tokenService } from "../services";

class AuthMiddleware {
  public checkToken(
    tokenName: "accessToken" | "refreshToken" = "accessToken",
    action = ETokenTypes.access
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.header("Authorization");

        if (!token) {
          next(new ApiError("Token not found", 401));
        }

        const jwtPayload = await tokenService.checkToken(token, action);

        const tokenInfo = await Token.findOne({ [tokenName]: token });

        if (!tokenInfo) {
          next(new ApiError("Token not valid", 401));
        }

        res.locals = { tokenInfo, jwtPayload };
        next();
      } catch (error) {
        next(error);
      }
    };
  }

  public checkActionToken(action: ETokenTypes) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { token } = req.params;

        if (!token) {
          next(new ApiError("Token not found", 401));
        }

        await tokenService.checkToken(token, action);

        const tokenInfo = await Action.findOne({ actionToken: token });

        if (!tokenInfo) {
          next(new ApiError("Token not valid", 401));
        }

        res.locals = { ...res.locals, tokenInfo };
        next();
      } catch (error) {
        next(error);
      }
    };
  }
}

export const authMiddleware = new AuthMiddleware();
