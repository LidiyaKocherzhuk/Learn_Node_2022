import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { Token } from "../models/Token";
import { tokenService } from "../services";
import { authValidator } from "../validators";

class AuthMiddleware {
  public async isValidLoginData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { error, value } = authValidator.login.validate(req.body);

      if (error) {
        next(new ApiError(error.message, 400));
      }

      res.locals = { clientData: value };
      next();
    } catch (error) {
      next(error);
    }
  }

  public async isAuthorized(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.header("Authorization");

      if (!accessToken) {
        next(new ApiError("Token not found", 401));
      }

      const verifiedToken = await tokenService.checkToken(
        accessToken,
        "access"
      );

      const tokenInfo = await Token.findOne({ accessToken });

      if (!tokenInfo) {
        next(new ApiError("Token not valid", 401));
      }

      res.locals = { tokenInfo, verifiedToken };
      next();
    } catch (error) {
      next(error);
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
