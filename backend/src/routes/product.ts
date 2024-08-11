import { Router } from "express";
import { authMiddleware, checkAdminRole } from "../middleware/authMiddleware";
import {
  createProduct,
  deleteProductById,
  getAdminProductById,
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

router.get("/:id", getProductById);

router.get("/getPaginatedProduct/all", getAllProducts);

router.delete("/admin/:id", authMiddleware, checkAdminRole, deleteProductById);

router.get("/admin/:id", authMiddleware, checkAdminRole, getAdminProductById);

router.put("/admin/:id", authMiddleware, checkAdminRole, updateProductById);

export default router;
