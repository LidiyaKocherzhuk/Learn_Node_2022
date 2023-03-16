import { NextFunction, Request, Response } from "express";

import { passwordService, userService } from "../services";
import { authService } from "../services/auth.service";

class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const clientData = req.body;

      const hashedPassword = await passwordService.hash(clientData.password);
      await userService.create({
        ...clientData,
        password: hashedPassword,
      });

      res.status(201);
    } catch (error) {
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const resss = await authService.login(res);

      res.status(200).json(resss);
    } catch (error) {
      next(error);
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
