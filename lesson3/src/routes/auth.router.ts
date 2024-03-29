import { Router } from "express";

import { authController } from "../controllers";
import { ETokenTypes } from "../enums";
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

authRouter.patch(
  "/password/change",
  authMiddleware.checkToken(),
  commonMiddleware.isBodyValid(authValidator.login),
  userMiddleware.checkExistUser("exist", "email"),
  userMiddleware.checkOldPassword(),
  authController.changePassword
);

authRouter.post(
  "/password/forgot",
  commonMiddleware.isBodyValid(authValidator.forgot),
  userMiddleware.checkExistUser("exist", "email"),
  authController.forgotPassword
);

authRouter.patch(
  "/password/forgot/:token",
  commonMiddleware.isBodyValid(authValidator.forgotPassword),
  authMiddleware.checkActionToken(ETokenTypes.forgot),
  userMiddleware.checkOldPassword("tokenInfo", "_user_id"),
  authController.setForgotPassword
);

authRouter.patch(
  "/activate/:token",
  authMiddleware.checkActionToken(ETokenTypes.activate),
  authController.setActionToken
);

authRouter.post(
  "/refresh",
  authMiddleware.checkToken("refreshToken", ETokenTypes.refresh),
  authController.refresh
);
