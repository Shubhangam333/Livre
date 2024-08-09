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

export const getAllUsers = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const [users, totalUsers] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          avatar: {
            select: {
              url: true,
            },
          },
        },
      }),
      prisma.user.count(),
    ]);

    res.status(200).json({
      success: true,
      users,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
    });
  }
);
export const getUserById = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.params.userId);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: {
          select: {
            url: true,
          },
        },
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  }
);
