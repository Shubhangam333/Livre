import { Request, Response, NextFunction } from "express";
import { TryCatch } from "./error";
import ErrorHandler from "../utils/helper";
import prisma from "../config/prisma-client";
import jwt from "jsonwebtoken";
import { User } from "../types/types";

export {};

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export const authMiddleware = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(new ErrorHandler("Authorization is required", 404));
    }
    const accessToken = authHeader.split(" ")[1];

    if (!accessToken) {
      return next(new ErrorHandler("Authorization is required", 404));
    }

    const payload = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!
    ) as { userId: string };

    if (!payload.userId)
      return next(new ErrorHandler("Unauthorized Request", 401));

    const user = await prisma.user.findUnique({
      where: {
        id: Number(payload.userId),
      },
    });
    req.user = user!;
    next();
  }
);
