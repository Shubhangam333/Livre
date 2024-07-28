import { Router } from "express";
// import { updateUser, getUserByFirebaseId } from "../controllers/users";
import { multerUpload } from "../middleware/multerMiddleware";
import { processImageUpload } from "../middleware/processImageUpload";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
router.patch(
  "/update",
  authMiddleware,
  multerUpload.single("avatar"),
  processImageUpload
);
router.get("/:id", authMiddleware);
export default router;
