import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { OldPassword } from "../models";
import { passwordService, userService } from "../services";
import { ILocals, IUser } from "../types";

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

  public checkOldPassword(
    action: "userFromDB" | "tokenInfo" = "userFromDB",
    id: "_id" | "_user_id" = "_id"
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { clientData } = req.res.locals as ILocals<IUser>;
        const userId = req.res.locals[action][id];

        const oldPasswords = await OldPassword.find({ _user_id: userId });

        oldPasswords.map(async (item) => {
          const comparedPassword = await passwordService.compare(
            clientData.password,
            item.oldPassword
          );

          if (comparedPassword) {
            next(
              new ApiError(
                "Give me new password! This password you already used!",
                400
              )
            );
          }

          next();
        });
      } catch (e) {
        next(e);
      }
    };
  }
}

export const userMiddleware = new UserMiddleware();
