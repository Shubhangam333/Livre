import { Request, Response, NextFunction } from "express";
import { TryCatch } from "./error";
import ErrorHandler from "../utils/helper";
import prisma from "../config/prisma-client";
import jwt from "jsonwebtoken";
import { AvatarImage, User } from "../types/types";

export {};

declare global {
  namespace Express {
    interface Request {
      user: User;
      avatar: AvatarImage;
    }
  }
}

export const authMiddleware = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(new ErrorHandler("Authorization is required", 401));
    }
    const accessToken = authHeader.split(" ")[1];

    if (!accessToken) {
      return next(new ErrorHandler("Authorization is required", 401));
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
      include: { avatar: true },
    });
    req.user = user!;
    next();
  }
);

export const checkAdminRole = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ErrorHandler("Unauthorized Request", 401));
    }

    if (req.user.role !== "ADMIN") {
      return next(new ErrorHandler("You do not have access", 403));
    }

    next();
  }
);
