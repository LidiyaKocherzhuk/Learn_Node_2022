import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { configs } from "./config";
import { cronRunner } from "./crons";
import { ApiError } from "./errors";
import { authRouter, userRouter } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/auth", authRouter);

//ERROR HANDLER
app.use(
  "/",
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const { message, status } = err;
    res.status(status || 500).json({ message, status });
  }
);

app.listen(configs.PORT, () => {
  try {
    console.log(`Server had started on port ${configs.PORT}!`);
    cronRunner();

    //Connect to MongoDB
    mongoose.connect(configs.DB_URL).then(() => console.log("Connected"));
  } catch (error) {
    console.log(error);
  }
});
