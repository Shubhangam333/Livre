import { Request, Response, NextFunction } from "express";
import { TryCatch } from "./error";
import ErrorHandler from "../utils/helper";

declare global {
  namespace Express {
    export interface Request {
      uid?: string;
      role?: "USER" | "ADMIN";
      image?: string;
    }
  }
}

export const authMiddleware = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      next(new ErrorHandler("Authorization is required", 404));
    }
    const accessToken = authHeader ? authHeader.split(" ")[1] : "";

    if (!accessToken) {
      next(new ErrorHandler("Authorization is required", 404));
    }
    next();
  }
);
