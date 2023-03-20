import { IUser } from "./user.type";

export type ILogin = Pick<IUser, "email" | "password">;
