import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middleware/error";
import ErrorHandler from "../utils/helper";
import { SignInInput, SignUpInput } from "../types/input";
import { generateAccessToken, generateRefreshToken } from "../utils/auth";
import bcrypt, { genSalt, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma-client";

export const register = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body as SignUpInput;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return next(new ErrorHandler("Email Already Exist", 400));
    }
    const isAdmin = req.body.isAdmin ? true : false;
    const role = isAdmin ? "ADMIN" : "USER";
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    res.status(201).json({ success: true, message: "Account created" });
  }
);

export const login = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as SignInInput;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.status(200).json({
      accessToken,
      refreshToken,
    });
  }
);

export const grantAccessToken = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return next(new ErrorHandler("Authorization is required", 404));
    }

    const payload = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as { userId: string };

    if (!payload.userId)
      return next(new ErrorHandler("Unauthorized Request", 404));

    const user = await prisma.user.findUnique({
      where: {
        id: Number(payload.userId),
      },
    });

    if (!user) return next(new ErrorHandler("Unauthorized Request", 401));

    const newAccessToken = generateAccessToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);

    res.status(200).json({
      success: true,
      tokens: { refreshToken: newRefreshToken, accessToken: newAccessToken },
    });
  }
);
