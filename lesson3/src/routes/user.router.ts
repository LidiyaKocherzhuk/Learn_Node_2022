import { Router } from "express";

import { userController } from "../controllers";

export const userRouter = Router();

userRouter.get("/", userController.getAll);

userRouter.get("/:userId", userController.getById);

userRouter.post("/", userController.create);

userRouter.patch("/:userId", userController.update);

userRouter.delete("/:userId", userController.delete);
