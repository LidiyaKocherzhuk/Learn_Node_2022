import { NextFunction, Request, Response } from "express";

import { authService } from "../services";

class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.register(req.res);

      res.status(201).json("ok");
    } catch (error) {
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPair = await authService.login(req.res);

      res.status(200).json(tokenPair);
    } catch (error) {
      next(error);
    }
  }

  public async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.changePassword(req.res);

      res.status(201).json("ok");
    } catch (error) {
      next(error);
    }
  }

  public async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.forgotPassword(req.res);

      res.status(200).json("ok");
    } catch (error) {
      next(error);
    }
  }

  public async setForgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await authService.setForgotPassword(req.res);

      res.status(201).json("ok");
    } catch (error) {
      next(error);
    }
  }

  public async setActionToken(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.setActionToken(req.res);

      res.status(200).json("ok");
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
