import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { userService } from "../services";
import { IUser } from "../types";
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

  public async isValidCreateData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
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

  public async isValidUpdate(req: Request, res: Response, next: NextFunction) {
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

  public async isValidDelete(req: Request, res: Response, next: NextFunction) {
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

  public checkExistUser(
    endpoint: "register" | "login",
    fieldName: string,
    from: "body" | "query" | "params" = "body",
    dbField: keyof IUser = "email"
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = req[from][fieldName];

        const user = await userService.getOne({ [dbField]: data });

        switch (endpoint) {
          case "register":
            if (user) {
              next(
                new ApiError(
                  `User with this params: ${data} already exist!`,
                  400
                )
              );
            }
            break;

          case "login":
            if (!user) {
              next(
                new ApiError(
                  `User with this params: ${data} does not exist!`,
                  400
                )
              );
            }
            break;
        }

        res.locals = { ...res.locals, userFromDB: user };

        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const userMiddleware = new UserMiddleware();
