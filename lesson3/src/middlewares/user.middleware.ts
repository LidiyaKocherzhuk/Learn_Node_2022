import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { userService } from "../services";
import { IUser } from "../types";

class UserMiddleware {
  public checkExistUser(
    whichUser: "new" | "exist",
    fieldName: string,
    from: "body" | "query" | "params" = "body",
    dbField: keyof IUser = "email"
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = req[from][fieldName];

        const user = await userService.getOne({ [dbField]: data });

        switch (whichUser) {
          case "new":
            if (user) {
              next(
                new ApiError(
                  `User with this params: ${data} already exist!`,
                  400
                )
              );
            }
            break;

          case "exist":
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
