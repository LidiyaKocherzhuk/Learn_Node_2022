import { Router } from "express";

import { authController } from "../controllers";
import { authMiddleware, userMiddleware } from "../middlewares";

export const authRouter = Router();

authRouter.post(
  "/register",
  userMiddleware.isValidCreateData,
  userMiddleware.checkExistUser("register", "email"),
  authController.register
);

authRouter.post(
  "/login",
  authMiddleware.isValidLoginData,
  userMiddleware.checkExistUser("login", "email"),
  authController.login
);
