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

router.get("/:id", authMiddleware, getProductById);

router.get("/getPaginatedProduct/all", getAllProducts);

router.delete("/:id", authMiddleware, checkAdminRole, deleteProductById);

router.put("/:id", authMiddleware, checkAdminRole, updateProductById);

export default router;
