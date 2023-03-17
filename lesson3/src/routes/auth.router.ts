import { Router } from "express";

import { authController } from "../controllers";
import {
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";
import { authValidator, userValidator } from "../validators";

export const authRouter = Router();

authRouter.post(
  "/register",
  commonMiddleware.isBodyValid(userValidator.create),
  userMiddleware.checkExistUser("new", "email"),
  authController.register
);

authRouter.post(
  "/login",
  commonMiddleware.isBodyValid(authValidator.login),
  userMiddleware.checkExistUser("exist", "email"),
  authController.login
);

authRouter.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);
