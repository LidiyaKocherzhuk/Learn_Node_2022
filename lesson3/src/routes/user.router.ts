import { Router } from "express";

import { userController } from "../controllers";
import { paramsMiddleware, userMiddleware } from "../middlewares";

export const userRouter = Router();

userRouter.get("/", userController.getAll);

userRouter.post("/", userMiddleware.createOrThrow, userController.create);

userRouter.get(
  "/:userId",
  paramsMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.getById
);

userRouter.patch(
  "/:userId",
  paramsMiddleware.isIdValid,
  userMiddleware.updateOrThrow,
  userController.update
);

userRouter.delete(
  "/:userId",
  paramsMiddleware.isIdValid,
  userMiddleware.deleteOrThrow,
  userController.delete
);
