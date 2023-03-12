import { Router } from "express";

import { authController } from "../controllers";
import { authMiddleware, userMiddleware } from "../middlewares";

export const authRouter = Router();

authRouter.post(
  "/register",
  userMiddleware.isValidCreate,
  authMiddleware.register,
  authController.register
);

authRouter.post("/login", authMiddleware.login, authController.login);
