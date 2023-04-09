import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { userService } from "../services";
import { ICommonResponse, IMessage, IQuery, IUser } from "../types";
import {UploadedFile} from "express-fileupload";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.getWithPagination(req.query as IQuery);

      return res.json(users);
    } catch (error) {
      next(error);
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
      next(error);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<IUser>>> {
    try {
      const user = await userService.create(res.locals as IUser);

      return res.json({ message: "User created successfully.", data: user });
    } catch (error) {
      next(error);
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
        next(new ApiError("Error...", 400));
      }

      return res.json({ message: "User updated successfully." });
    } catch (error) {
      next(error);
    }
  }

  public async uploadAvatar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IMessage>> {
    try {
      const { userId } = req.params;
      const avatar = req.files.avatar as UploadedFile;

      const user = await userService.uploadAvatar(avatar, userId);

      return res.status(201).json({ user });
    } catch (error) {
      next(error);
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
      next(error);
    }
  }
}

export const userController = new UserController();
