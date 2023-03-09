import { Types } from "mongoose";

export const EGenres = {
  male: "male",
  female: "female",
  mixed: "mixed",
};

export interface IUser {
  _id: Types.ObjectId;
  name?: string;
  email: string;
  password: string;
  gender?: string;
}
