import { Router } from "express";
import { multerUpload } from "../middleware/multerMiddleware";
import { processImageUpload } from "../middleware/processImageUpload";
import { authMiddleware } from "../middleware/authMiddleware";
import { profile } from "../controllers/users";

const router = Router();
router.patch(
  "/update",
  authMiddleware,
  multerUpload.single("avatar"),
  processImageUpload
);
router.get("/:id", authMiddleware);
router.get("/profile", authMiddleware, profile);
export default router;
