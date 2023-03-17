import { IToken, ITokenPayload } from "./token.type";
import { IUser } from "./user.type";

export interface ILocals<T> {
  userFromDB?: IUser;
  clientData?: T;
  tokenInfo?: IToken;
  jwtPayload?: ITokenPayload;
}

export type ILogin = Pick<IUser, "email" | "password">;
