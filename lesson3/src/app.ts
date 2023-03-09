import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { configs } from "./config";
import { ApiError } from "./errors/api.error";
import { userRouter } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

//ERROR HANDLER
app.use(
  "/",
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const { message, status } = err;
    res.json({ message, status }).status(status);
  }
);

app.listen(configs.PORT, () => {
  try {
    console.log(`Server had started on port ${configs.PORT}!`);

    //Connect to MongoDB
    mongoose
      .connect("mongodb://127.0.0.1:27017/september-2022")
      .then(() => console.log("Connected"));
  } catch (error) {
    console.log(error);
  }
});
