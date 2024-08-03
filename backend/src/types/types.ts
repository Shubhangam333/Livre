import { NextFunction, Request, Response } from "express";

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export const Role: {
  USER: "USER";
  ADMIN: "ADMIN";
} = {
  USER: "USER",
  ADMIN: "ADMIN",
};

export type Role = (typeof Role)[keyof typeof Role];

export type AvatarImage = {
  public_id: string;
  url: string;
};
export type Avatar = {
  id: number;
  public_id: string;
  url: string;
  userId: number; // This will be a relation to User
};
export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  avatar?: Avatar | null; // This is an optional property
  createdAt: Date;
  updatedAt: Date;
};

export type ProductImages = {
  id: string;
  public_id: string;
  secure_url: string;
  productId: number;
};
