import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middleware/error";
import ErrorHandler from "../utils/helper";
import { userService } from "../services/userService";
import { SignUpInput } from "../types/input";
import { generateAccessToken, generateRefreshToken } from "../utils/auth";
import bcrypt from "bcrypt";

export const register = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body as SignUpInput;
    const isExist = await userService.findUserByEmail(email);

    if (isExist) {
      return next(new ErrorHandler("Email Already Exist", 400));
    }
    const isAdmin = req.body.isAdmin ? true : false;
    await userService.createUser(name, email, password, isAdmin);

    res.status(201).json({ msg: "Account created" });
  }
);

export const login = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await userService.findUserByEmail(email);
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const accessToken = generateAccessToken(user.id.toString());
    const refreshToken = generateRefreshToken(user.id.toString());

    res.status(200).json({
      profile: {
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      tokens: { accessToken, refreshToken },
    });
  }
);
