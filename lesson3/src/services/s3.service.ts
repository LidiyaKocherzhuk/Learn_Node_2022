import { extname } from "node:path";

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { UploadedFile } from "express-fileupload";
import { v4 } from "uuid";

import { configs } from "../config";
import { ApiError } from "../errors";

class S3Service {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: configs.S3_REGION,
      credentials: {
        accessKeyId: configs.AWS_ACCESS_KEY,
        secretAccessKey: configs.AWS_SECRET_KEY,
      },
    });
  }

  public async uploadPhoto(
    file: UploadedFile,
    itemType: string,
    itemId: string
  ): Promise<string> {
    try {
      const filePath = this.buildPath(file.name, itemType, itemId);

      await this.client.send(
        new PutObjectCommand({
          Bucket: configs.S3_NAME,
          ACL: configs.S3_ACL,
          Key: file.mimetype,
          ContentType: itemType,
          Body: file.data,
        })
      );

      return filePath;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async deletePhoto(filePath: string): Promise<void> {
    try {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: configs.S3_NAME,
          Key: filePath,
        })
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  private buildPath(
    fileName: string,
    itemType: string,
    itemId: string
  ): string {
    return `${itemType}/${itemId}/${v4()}${extname(fileName)}`;
  }
}

export const s3Service = new S3Service();
