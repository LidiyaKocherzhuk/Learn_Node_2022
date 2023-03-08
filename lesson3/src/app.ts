import express, { Request, Response } from "express";
import mongoose from "mongoose";

import { User } from "./models/User.model";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.create(req.body);
    res.json(users);
  } catch (error) {
    res.json(error.message);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  try {
    console.log(`Server had started on port ${PORT}!`);
    mongoose
      .connect("mongodb://127.0.0.1:27017/september-2022")
      .then(() => console.log("Connected"));
  } catch (error) {
    console.log(error);
  }
});
