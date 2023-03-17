import { Types } from "mongoose";

export interface IToken {
  _id: Types.ObjectId;
  _user_id: Types.ObjectId;
  accessToken: string;
  refreshToken: string;
}

export interface ITokenPayload {
  userName: string;
  _user_id: Types.ObjectId;
}

export type ITokenPair = Pick<IToken, "accessToken" | "refreshToken">;
