import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";

import { ApiError } from "../errors";

class ParamsMiddleware {
  public async isIdValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      if (!isValidObjectId(userId)) {
        next(new ApiError("UserId does not valid", 400));
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}

export const paramsMiddleware = new ParamsMiddleware();
