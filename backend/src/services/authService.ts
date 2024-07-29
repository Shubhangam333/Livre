import { genSalt, hash } from "bcrypt";
import prisma from "../config/prisma-client";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/helper";
import jwt from "jsonwebtoken";
import { User } from "../types/types";
import { TryCatch } from "../middleware/error";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export const userService = {
  findUserByEmail: async (email: string) => {
    return await prisma.user.findFirst({
      where: {
        email,
      },
    });
  },
  createUser: async (
    name: string,
    email: string,
    password: string,
    isAdmin: boolean
  ) => {
    const role = isAdmin ? "ADMIN" : "USER";
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    return await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });
  },
  validateRefreshToken: async (refreshToken: string) =>
    TryCatch(async (req: Request, res: Response, next: NextFunction) => {
      if (!refreshToken) {
        return next(new ErrorHandler("Authorization is required", 404));
      }

      const payload = jwt.verify(
        refreshToken,
        process.env.ACCESS_TOKEN_SECRET!
      ) as { userId: string };

      if (!payload.userId)
        return next(new ErrorHandler("Unauthorized Request", 401));

      return true;
    }),
};
