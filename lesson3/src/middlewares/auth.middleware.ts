import { NextFunction, Request, Response } from "express";

import { ETokenTypes } from "../enums";
import { ApiError } from "../errors";
import { TokenModel } from "../models";
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

        const jwtPayload = await tokenService.checkToken(
          token,
          action
        );

        const tokenInfo = await TokenModel.findOne({ [tokenName]: token });

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
  //
  // public async checkRefreshToken(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   try {
  //     const refreshToken = req.header("Authorization");
  //
  //     if (!refreshToken) {
  //       next(new ApiError("Token not found", 401));
  //     }
  //
  //     const jwtPayload = await tokenService.checkToken(
  //       refreshToken,
  //       ETokenTypes.refresh
  //     );
  //     const tokenInfo = await TokenModel.findOne({ refreshToken });
  //
  //     if (!tokenInfo) {
  //       next(new ApiError("Token not valid", 401));
  //     }
  //
  //     console.log(jwtPayload);
  //     res.locals = { tokenInfo, jwtPayload };
  //     next();
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

export const authMiddleware = new AuthMiddleware();