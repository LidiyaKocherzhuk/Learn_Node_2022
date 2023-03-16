import { model, Schema } from "mongoose";

const tokenSchema = new Schema(
  {
    userId: {
      type: String,
      trim: true,
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

export const Token = model("token", tokenSchema);
