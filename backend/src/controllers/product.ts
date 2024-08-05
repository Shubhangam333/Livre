import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middleware/error";
import ErrorHandler from "../utils/helper";
import prisma from "../config/prisma-client";
import { ProductInput } from "../types/input";
import { v2 as cloudinary } from "cloudinary";

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export const createProduct = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, price, publisher, author, stock, genreId } =
      req.body as ProductInput;

    const genre = await prisma.genre.findUnique({
      where: { id: Number(genreId) },
    });

    if (!genre) {
      return next(new ErrorHandler("Invalid genreID", 400));
    }

    let imagesData = [];
    if (!req.files) {
      next(new ErrorHandler("Product Images are required", 400));
    }

    let images = req.files as Array<MulterFile>;
    for (let i = 0; i < images.length; i++) {
      const myCloud = await cloudinary.uploader.upload(images[i].path, {
        folder: "livre_products",
        crop: "scale",
      });
      imagesData.push({
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      });
    }

    await prisma.product.create({
      data: {
        title,
        description,
        price: Number(price),
        publisher,
        author,
        stock: Number(stock),
        genreId: Number(genreId),
        images: {
          create: imagesData.map(
            (image: { public_id: string; url: string }) => ({
              public_id: image.public_id,
              secure_url: image.url,
            })
          ),
        },
      },
    });

    res.status(201).json({ success: true, message: "Product created" });
  }
);

export const getProductById = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        images: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
        genre: true,
      },
    });

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({ product });
  }
);

export const getAllProducts = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      genre,
      minPrice,
      maxPrice,
      search,
      page = 1,
      pageSize = 10,
    } = req.query;

    const filters: any = {};

    console.log(genre);

    if (genre) {
      filters.genre = {
        name: {
          contains: genre,
        },
      };
    }

    if (search) {
      filters.title = {
        contains: search,
        // mode: "insensitive",
      };
    }

    // Price filter
    if (minPrice && maxPrice) {
      filters.price = {
        gte: Number(minPrice),
        lte: Number(maxPrice),
      };
    }

    const [totalProducts, products] = await Promise.all([
      prisma.product.count({
        where: filters,
      }),
      prisma.product.findMany({
        where: filters,
        skip: (Number(page) - 1) * Number(pageSize),
        take: Number(pageSize),
        include: {
          images: true,
          reviews: true,
          genre: true,
        },
      }),
    ]);

    res.json({
      totalProducts,
      products,
      currentPage: Number(page),
      totalPages: Math.ceil(totalProducts / Number(pageSize)),
    });
  }
);
export const deleteProductById = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: { images: true },
    });

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    // Deleting images from Cloudinary
    for (const image of product.images) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    await prisma.product.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ success: true, message: "Product deleted" });
  }
);

export const updateProductById = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, description, price, publisher, author, stock, genreId } =
      req.body as ProductInput;

    // Find the existing product
    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: { images: true },
    });

    if (!existingProduct) {
      return next(new ErrorHandler("Product not found", 404));
    }

    // If genreId is provided, validate it
    if (genreId) {
      const genre = await prisma.genre.findUnique({
        where: { id: Number(genreId) },
      });

      if (!genre) {
        return next(new ErrorHandler("Invalid genreID", 400));
      }
    }

    // Update product images if new images are provided
    let imagesData = [];
    if (req.files) {
      // Delete existing images from Cloudinary
      for (const image of existingProduct.images) {
        await cloudinary.uploader.destroy(image.public_id);
      }

      // Upload new images to Cloudinary
      let images = req.files as Array<MulterFile>;
      for (let i = 0; i < images.length; i++) {
        const myCloud = await cloudinary.uploader.upload(images[i].path, {
          folder: "livre_products",
          crop: "scale",
        });
        imagesData.push({
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        });
      }
    }

    // Update the product in the database
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        price: price !== undefined ? Number(price) : undefined,
        publisher,
        author,
        stock: stock !== undefined ? Number(stock) : undefined,
        genreId: genreId !== undefined ? Number(genreId) : undefined,
        images: {
          deleteMany: {}, // Delete existing images
          create: imagesData.map(
            (image: { public_id: string; url: string }) => ({
              public_id: image.public_id,
              secure_url: image.url,
            })
          ),
        },
      },
    });

    res.status(200).json({ success: true, product: updatedProduct });
  }
);
