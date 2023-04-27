import express, { NextFunction, Request, Response } from "express";
import fileUploader from "express-fileupload";
import mongoose from "mongoose";
import * as swaggerUi from "swagger-ui-express";

import { configs } from "./config";
import { cronRunner } from "./crons";
import { ApiError } from "./errors";
import { authRouter, userRouter } from "./routes";
import * as swaggerJson from "./utils/swagger.json";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUploader());

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

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
