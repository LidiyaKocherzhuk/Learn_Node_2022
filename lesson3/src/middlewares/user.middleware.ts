import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { userService } from "../services";
import { userValidator } from "../validators";

class UserMiddleware {
  public async getByIdOrThrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const user = await userService.getById(userId);

      if (!user) {
        next(new ApiError("User does not exists", 422));
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  public async createOrThrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = userValidator.create.validate(req.body);

      if (error) {
        next(new ApiError(error.message, 400));
      }

      req.res.locals = value;
      next();
    } catch (error) {
      next(error);
    }
  }

  public async updateOrThrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const user = await userService.getById(userId);

      if (!user) {
        next(new ApiError("User does not exists", 422));
      }

      const { error, value } = userValidator.update.validate(req.body);

      if (error) {
        next(new ApiError(error.message, 400));
      }

      req.res.locals = value;
      next();
    } catch (error) {
      next(error);
    }
  }

  public async deleteOrThrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const user = await userService.getById(userId);

      if (!user) {
        next(new ApiError("User does not exists", 422));
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}

export const userMiddleware = new UserMiddleware();
