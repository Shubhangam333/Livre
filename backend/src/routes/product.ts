import { Router } from "express";
import { authMiddleware, checkAdminRole } from "../middleware/authMiddleware";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../controllers/product";

import { productInputValidatorSchema } from "../utils/validationSchema";
import { multerUpload } from "../middleware/multerMiddleware";
import { productValidate } from "../middleware/validator";

const router = Router();

router.post(
  "/create-product",
  authMiddleware,
  checkAdminRole,
  multerUpload.array("images"),
  productValidate(productInputValidatorSchema),
  createProduct
);

router.get("/product/:id", authMiddleware, getProductById);

router.get("/product/all", authMiddleware, getAllProducts);

router.delete(
  "/product/:id",
  authMiddleware,
  checkAdminRole,
  deleteProductById
);

router.put("/product/:id", authMiddleware, checkAdminRole, updateProductById);

export default router;
