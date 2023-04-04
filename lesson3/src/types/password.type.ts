import { Types } from "mongoose";

export interface IOldPassword {
  _id: Types.ObjectId;
  _user_id: Types.ObjectId;
  oldPassword: string;
}
