import { NextFunction, Request, Response } from "express";

import { userService } from "../services";
import { ICommonResponse, IMessage, IUser } from "../types";
import {ApiError} from "../errors/api.error";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.getAll();

      return res.json(users);
    } catch (error) {
      next(error.message);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { userId } = req.params;

      const user = await userService.getById(userId);

      return res.json(user);
    } catch (error) {
      next(error.message);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<IUser>>> {
    try {
      const user = await userService.create(req.body);

      return res.json({ message: "User created successfully.", data: user });
    } catch (error) {
      next(error.message);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IMessage>> {
    try {
      const { userId } = req.params;

      const result = await userService.update(userId, req.body);

      if (!result.acknowledged) {
        throw new ApiError("Error...", 400);
      }

      return res.json({ message: "User updated successfully." });
    } catch (error) {
      next(error.message);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IMessage>> {
    try {
      const { userId } = req.params;

      await userService.delete(userId);

      return res.json({ message: "User deleted successfully." });
    } catch (error) {
      next(error.message);
    }
  }
}

export const userController = new UserController();
