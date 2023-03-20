import { NextFunction, Request, Response } from "express";

import { authService } from "../services";

class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.register(res);

      res.status(201);
    } catch (error) {
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPair = await authService.login(res);

      res.status(200).json(tokenPair);
    } catch (error) {
      next(error);
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPair = await authService.refresh(res);

      res.status(200).json(tokenPair);
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
