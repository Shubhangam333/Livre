import { Router } from "express";
import { register } from "../controllers/auth";
import { newUserSchema } from "../utils/validationSchema";
import validate from "../middleware/validator";
const router = Router();

router.post("/sign-up", validate(newUserSchema), register);

export default router;
