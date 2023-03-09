import { UpdateWriteOpResult } from "mongoose";

import { User } from "../models";
import { IUser } from "../types";

class UserService {
  public async getAll(): Promise<IUser[]> {
    return User.find();
  }

  public getById(_id: string): Promise<IUser> {
    return User.findOne({ _id });
  }

  public create(createUser: IUser): Promise<IUser> {
    return User.create(createUser);
  }

  public update(
    _id: string,
    updateUser: Partial<IUser>
  ): Promise<UpdateWriteOpResult> {
    return User.updateOne({ _id }, updateUser);
  }

  public async delete(_id: string): Promise<void> {
    await User.deleteOne({ _id });
  }
}

export const userService = new UserService();
