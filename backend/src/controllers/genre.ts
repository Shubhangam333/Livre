import { Request, Response, NextFunction } from "express";
import { TryCatch } from "../middleware/error";
import ErrorHandler from "../utils/helper";
import prisma from "../config/prisma-client";
import { GenreInput } from "../types/input";

export const createGenre = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body as GenreInput;

    const genre = await prisma.genre.create({
      data: {
        name,
      },
    });

    res.status(201).json({ success: true, message: "Genre Created" });
  }
);

export const getGenreById = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const genre = await prisma.genre.findUnique({
      where: { id: Number(id) },
    });

    if (!genre) {
      return next(new ErrorHandler("Genre not found", 404));
    }

    res.status(200).json({ success: true, genre });
  }
);

export const getAllGenres = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const genres = await prisma.genre.findMany();

    res.status(200).json({ success: true, genres });
  }
);

export const updateGenreById = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name } = req.body;

    const updatedGenre = await prisma.genre.update({
      where: { id: Number(id) },
      data: {
        name,
      },
    });

    res.status(200).json({ success: true, genre: updatedGenre });
  }
);

export const deleteGenreById = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    await prisma.product.deleteMany({
      where: { genreId: Number(id) },
    });

    await prisma.genre.delete({
      where: { id: Number(id) },
    });

    res
      .status(200)
      .json({ success: true, message: "Genre and its products deleted" });
  }
);
