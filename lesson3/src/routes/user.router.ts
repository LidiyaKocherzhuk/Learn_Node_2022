import { Router } from "express";

import { userController } from "../controllers";
import {
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";
import { fileMiddleware } from "../middlewares/file.middleware";
import { userValidator } from "../validators";

export const userRouter = Router();

userRouter.get("/", userController.getAll);

userRouter.get(
  "/:userId",
  authMiddleware.checkToken(),
  commonMiddleware.isIdValid("userId"),
  userMiddleware.checkExistUser("exist", "userId", "params", "_id"),
  userController.getById
);

userRouter.put(
  "/:userId",
  authMiddleware.checkToken(),
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(userValidator.update),
  userMiddleware.checkExistUser("exist", "userId", "params", "_id"),
  userController.update
);

userRouter.put(
  "/:userId/avatar",
  authMiddleware.checkToken(),
  commonMiddleware.isIdValid("userId"),
  userMiddleware.checkExistUser("exist", "userId", "params", "_id"),
  fileMiddleware.checkFile("avatar"),
  userController.uploadAvatar
);

userRouter.delete(
  "/:userId/avatar",
  authMiddleware.checkToken(),
  commonMiddleware.isIdValid("userId"),
  userMiddleware.checkExistUser("exist", "userId", "params", "_id"),
  userController.uploadAvatar
);

userRouter.delete(
  "/:userId",
  authMiddleware.checkToken(),
  commonMiddleware.isIdValid("userId"),
  userMiddleware.checkExistUser("exist", "userId", "params", "_id"),
  userController.delete
);
