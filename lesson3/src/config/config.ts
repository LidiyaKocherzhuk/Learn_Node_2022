import { config } from "dotenv";
config();

export const configs = {
  PORT: process.env.PORT || 5000,
  DB_URL: process.env.BD_URL || "localhost:3000",
  FRONT_URL: process.env.FRONT_URL,

  SECRET_ACCESS_KEY: process.env.JWT_SECRET_ACCESS_KEY,
  SECRET_REFRESH_KEY: process.env.JWT_SECRET_REFRESH_KEY,
  SECRET_ACTIVATE_KEY: process.env.SECRET_ACCESS_KEY,
  SECRET_FORGOT_KEY: process.env.SECRET_REFRESH_KEY,

  ACCESS_LIFE_TIME: "3d",
  REFRESH_LIFE_TIME: "30d",
  ACTION_LIFE_TIME: "7d",

  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
  NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD,

  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,

  S3_NAME: process.env.S3_NAME,
  S3_REGION: process.env.S3_REGION,
  S3_URL: process.env.S3_URL,
  S3_ACL: process.env.S3_ACL,


  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
};
