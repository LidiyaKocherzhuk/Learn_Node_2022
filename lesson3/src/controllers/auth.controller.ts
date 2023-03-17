import { NextFunction, Request, Response } from "express";

import { EEmailActions } from "../enums";
import {
  authService,
  emailService,
  passwordService,
  userService,
} from "../services";

class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const clientData = req.body;

      const email = await emailService.sendMail(
        "lidiyakocherzchuk@gmail.com",
        EEmailActions.WELCOME
      );
      console.log(email, "controller");

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
