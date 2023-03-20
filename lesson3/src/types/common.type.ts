import { IToken, ITokenPayload } from "./token.type";
import { IUser } from "./user.type";

export interface IError extends Error {
  status: number;
}

export interface IMessage {
  message: string;
}

export interface ICommonResponse<T> extends IMessage {
  data: T;
}

export interface ILocals<T> {
  userFromDB?: IUser;
  clientData?: T;
  tokenInfo?: IToken;
  jwtPayload?: ITokenPayload;
}
