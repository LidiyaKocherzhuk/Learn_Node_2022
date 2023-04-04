import { Response } from "express";

import { EEmailActions, ESmsActions, ETokenTypes, EUserStatus } from "../enums";
import { ApiError } from "../errors";
import { Action, OldPassword, Token, User } from "../models";
import { ILocals, ILogin, ITokenPair, IUser } from "../types";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { smsService } from "./sms.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AuthService {
  public async register(res: Response): Promise<void> {
    try {
      const { clientData } = res.locals;

      const hashedPassword = await passwordService.hash(clientData.password);
      const createdUser = await userService.create({
        ...clientData,
        password: hashedPassword,
      });
      await OldPassword.create({
        _user_id: createdUser._id,
        oldPassword: hashedPassword,
      });

      const email = await emailService.sendMail(
        clientData.email,
        EEmailActions.WELCOME
      );

      if (email.rejected.length) {
        throw new ApiError("Email rejected", 550);
      }

      await smsService.sendSms("+380683823743", ESmsActions.WELCOME);
      await this.activate(createdUser);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(res: Response): Promise<ITokenPair> {
    try {
      const { userFromDB, clientData } = res.locals as ILocals<ILogin>;
      const { _id, name } = userFromDB;

      const comparePassword = await passwordService.compare(
        clientData.password,
        userFromDB.password
      );

      if (!comparePassword) {
        throw new ApiError("Email or password not valid!", 400);
      }

      const tokenPair = await tokenService.generateTokenPair({
        _user_id: _id,
        userName: name,
      });

      await Token.create({ ...tokenPair, _user_id: _id });

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async changePassword(res: Response): Promise<void> {
    try {
      const { clientData, userFromDB } = res as ILocals<IUser>;
      const hashedPassword = passwordService.hash(clientData.password);

      await Promise.all([
        User.updateOne({ _id: userFromDB._id }, { password: hashedPassword }),
        OldPassword.create({
          _user_id: userFromDB._id,
          oldPassword: hashedPassword,
        }),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async forgotPassword(res: Response): Promise<void> {
    try {
      const { userFromDB } = res.locals as ILocals<IUser>;
      const actionToken = tokenService.generateActionToken(
        {
          userName: userFromDB.name,
          _user_id: userFromDB._id,
        },
        ETokenTypes.forgot
      );

      await Action.create({
        actionToken,
        _user_id: userFromDB._id,
        tokenType: ETokenTypes.forgot,
      });

      await emailService.sendMail(
        userFromDB.email,
        EEmailActions.FORGOT_PASSWORD,
        { token: actionToken }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async setForgotPassword(res: Response): Promise<void> {
    try {
      const { tokenInfo, clientData } = res.locals as ILocals<IUser>;

      const hashedPassword = await passwordService.hash(clientData.password);

      await Promise.all([
        User.updateOne(
          { _id: tokenInfo._user_id },
          { password: hashedPassword }
        ),
        Action.deleteOne({ _id: tokenInfo._id }),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async activate(user: IUser): Promise<void> {
    try {
      const actionToken = tokenService.generateActionToken(
        {
          userName: user.name,
          _user_id: user._id,
        },
        ETokenTypes.activate
      );

      await Action.create({
        actionToken,
        _user_id: user._id,
        tokenType: ETokenTypes.activate,
      });

      await emailService.sendMail(user.email, EEmailActions.ACTIVATE, {
        token: actionToken,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async setActionToken(res: Response): Promise<void> {
    try {
      const { tokenInfo } = res.locals as ILocals<IUser>;

      await Promise.all([
        User.updateOne(
          { _id: tokenInfo._user_id },
          { isActivated: EUserStatus.active }
        ),
        Action.deleteOne({ _id: tokenInfo._id }),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refresh(res: Response): Promise<ITokenPair> {
    try {
      const { jwtPayload, tokenInfo } = res.locals as ILocals<IUser>;
      const { _user_id, userName } = jwtPayload;

      const tokenPair = await tokenService.generateTokenPair({
        _user_id,
        userName,
      });

      await Promise.all([
        Token.create({ ...tokenPair, _user_id }),
        Token.deleteOne({ _id: tokenInfo._id }),
      ]);

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
