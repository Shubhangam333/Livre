import { genSalt, hash } from "bcrypt";
import prisma from "../config/prisma-client";

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
};
