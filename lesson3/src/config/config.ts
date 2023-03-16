import { config } from "dotenv";
config();

export const configs = {
  PORT: process.env.PORT || 5000,
  DB_URL: process.env.BD_URL || "localhost:3000",

  SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
  SECRET_REFRESH_KEY: process.env.SECRET_ACCESS_KEY,
  ACCESS_LIFE_TIME: process.env.REFRESH_LIFE_TIME || "3d",
  REFRESH_LIFE_TIME: process.env.REFRESH_LIFE_TIME || "30d",
};
