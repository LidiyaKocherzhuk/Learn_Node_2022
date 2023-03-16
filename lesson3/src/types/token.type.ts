import { Types } from "mongoose";

export interface ITokenPayload {
  userName: string;
  userId: Types.ObjectId;
}

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}
