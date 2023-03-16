import { Router } from "express";

import { userController } from "../controllers";
import {
  authMiddleware,
  paramsMiddleware,
  userMiddleware,
} from "../middlewares";

export const userRouter = Router();

userRouter.get("/", userController.getAll);

userRouter.get(
  "/:userId",
  authMiddleware.isAuthorized,
  paramsMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.getById
);

userRouter.patch(
  "/:userId",
  paramsMiddleware.isIdValid,
  userMiddleware.isValidUpdate,
  userController.update
);

userRouter.delete(
  "/:userId",
  paramsMiddleware.isIdValid,
  userMiddleware.isValidDelete,
  userController.delete
);
