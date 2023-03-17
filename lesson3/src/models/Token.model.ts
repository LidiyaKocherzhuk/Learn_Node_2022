import { model, Schema, Types } from "mongoose";

import { User } from "./User.model";

const tokenSchema = new Schema(
  {
    _user_id: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
    accessToken: {
      type: String,
      trim: true,
    },
    refreshToken: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const TokenModel = model("token", tokenSchema);
