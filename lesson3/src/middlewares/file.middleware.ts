import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { fileConstants } from "../constants/file.constant";
import { ApiError } from "../errors";

class FileMiddleware {
  public checkFile(fieldName: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (req.files) {
          const image = req.files[fieldName];

          const { mimetype, size } = image as UploadedFile;

          if (
            !fileConstants.PHOTOS_MIMETYPE.includes(mimetype) &&
            size > fileConstants.PHOTO_MAX_SIZE
          ) {
            next(new ApiError("Wrong file format or size is too big!!!", 400));
          }
          if (
            fileConstants.PHOTOS_MIMETYPE.includes(mimetype) &&
            size < fileConstants.PHOTO_MAX_SIZE
          ) {
            req.res.locals[fieldName] = image as UploadedFile;
          }
          next();
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const fileMiddleware = new FileMiddleware();
