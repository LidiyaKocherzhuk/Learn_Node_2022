import { model, Schema } from "mongoose";

import { EGenders, EUserStatus } from "../enums";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    gender: {
      type: String,
      enum: EGenders,
      required: false,
      trim: true,
    },
    avatar: {
      type: String,
      required: false,
      trim: true,
    },
    isActivated: {
      type: String,
      default: EUserStatus.inactive,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model("user", userSchema);
