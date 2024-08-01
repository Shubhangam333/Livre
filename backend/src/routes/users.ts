import { Router } from "express";
import { multerUpload } from "../middleware/multerMiddleware";
import { processImageUpload } from "../middleware/processImageUpload";
import { authMiddleware } from "../middleware/authMiddleware";
import { profile, updateUser } from "../controllers/users";

const router = Router();
// router.patch(
//   "/update",
//   authMiddleware,
//   multerUpload.single("avatar"),
//   processImageUpload
// );
router.put("/update-profile", authMiddleware, updateUser);
router.get("/profile", authMiddleware, profile);
export default router;
