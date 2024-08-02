import { TryCatch } from "../middleware/error";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/helper";
import prisma from "../config/prisma-client";
import { v2 as cloudinary } from "cloudinary";

export const profile = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      id: req.user.id,
      role: req.user.role,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      createdAt: req.user.createdAt,
      updatedAt: req.user.updatedAt,
    });
  }
);

export const updateUser = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user;
    const { name, email } = req.body as { name: string; email: string };

    if (!name && !email) {
      return next(
        new ErrorHandler(
          "At least one field (name or email) must be provided",
          400
        )
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email },
    });

    res
      .status(200)
      .json({ success: true, message: "User updated successfully." });
  }
);

export const updateAvatar = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user;
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { avatar: true },
    });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    if (user.avatar) {
      await prisma.avatar.delete({
        where: { id: user.avatar.id },
      });
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    await prisma.user.update({
      where: { id: Number(id) },
      data: {
        avatar: {
          create: {
            public_id: req.avatar.public_id,
            url: req.avatar.url,
          },
        },
      },
      include: { avatar: true },
    });
    res.status(200).json({
      success: true,
      message: "Avatar Updated successfully.",
    });
  }
);
