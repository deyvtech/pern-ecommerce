import express from "express";
import { loginController } from "../controllers/auth/loginController.js";
import { registerController } from "../controllers/auth/registerController.js";
import { logoutController } from "../controllers/auth/logoutController.js";
import { me } from "../controllers/auth/me.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/register", registerController);
router.get("/me", verifyToken, me);

export default router;