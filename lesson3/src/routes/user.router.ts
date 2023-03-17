import { Router } from "express";

import { userController } from "../controllers";
import {
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";
import { userValidator } from "../validators";

export const userRouter = Router();

userRouter.get("/", userController.getAll);

userRouter.get(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userMiddleware.checkExistUser("exist", "userId", "params", "_id"),
  userController.getById
);

userRouter.patch(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(userValidator.update),
  userMiddleware.checkExistUser("exist", "userId", "params", "_id"),
  userController.update
);

userRouter.delete(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userMiddleware.checkExistUser("exist", "userId", "params", "_id"),
  userController.delete
);
