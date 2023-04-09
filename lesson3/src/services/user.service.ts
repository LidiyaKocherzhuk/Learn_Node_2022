import { UploadedFile } from "express-fileupload";
import { UpdateWriteOpResult } from "mongoose";

import { ApiError } from "../errors";
import { User } from "../models";
import { IPaginationResponse, IQuery, IUser } from "../types";
import { s3Service } from "./s3.service";

class UserService {
  public async getWithPagination(
    query: IQuery
  ): Promise<IPaginationResponse<IUser>> {
    try {
      const {
        page = 1,
        limit = 5,
        sortedBy = "createdAt",
        ...searchParams
      } = query;

      const skip = +limit * (+page - 1);

      const users = await User.find(searchParams)
        .limit(+limit)
        .skip(skip)
        .sort(sortedBy)
        .lean();

      const usersTotalCount = await User.count();
      const perPage = +page > 1 ? +page - 1 : 0;

      return {
        page: +page,
        perPage: +perPage,
        itemsCount: usersTotalCount,
        itemsFound: users.length,
        data: users,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public getById(_id: string): Promise<IUser> {
    return User.findById(_id);
  }

  public getOne(params: Partial<IUser>): Promise<IUser> {
    return User.findOne(params);
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

  public async uploadAvatar(
    file: UploadedFile,
    _id: string
  ): Promise<UpdateWriteOpResult> {
    const filePath = await s3Service.uploadPhoto(file, "user", _id);
    return this.update(_id, { avatar: filePath });
  }

  public async delete(_id: string): Promise<void> {
    await User.deleteOne({ _id });
  }
}

export const userService = new UserService();
