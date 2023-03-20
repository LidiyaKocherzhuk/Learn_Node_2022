import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors";

class CommonMiddleware {
  public isIdValid(idField: string, from: "params" | "query" = "params") {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!isObjectIdOrHexString(req[from][idField])) {
          next(new ApiError("UserId does not valid", 400));
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  }

  public isBodyValid(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { error, value } = validator.validate(req.body);

        if (error) {
          next(new ApiError(error.message, 400));
        }

        req.res.locals = { clientData: value };
        next();
      } catch (error) {
        next(error);
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
