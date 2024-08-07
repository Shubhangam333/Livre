import { Response, NextFunction, Request } from "express";
import { v2 as cloudinary } from "cloudinary";
import { TryCatch } from "./error";

export const processImageUpload = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req?.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path);

      req.avatar = {
        url: imageUpload.secure_url,
        public_id: imageUpload.public_id,
      };
    }
    next();
  }
);
