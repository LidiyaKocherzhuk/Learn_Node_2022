import { IUser } from "./user.type";

export interface ILocals<T> {
  userFromDB: IUser;
  clientData: T;
}

export interface ILogin {
  email: string;
  password: string;
}
