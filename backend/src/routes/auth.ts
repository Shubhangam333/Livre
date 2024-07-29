import { Router } from "express";
import { grantAccessToken, login, register } from "../controllers/auth";
import {
  SignUpInputSchema,
  SignInInputSchema,
} from "../utils/validationSchema";
import validate from "../middleware/validator";
const router = Router();

router.post("/sign-up", validate(SignUpInputSchema), register);
router.post("/sign-in", validate(SignInInputSchema), login);
router.post("/refresh-token", grantAccessToken);

export default router;
