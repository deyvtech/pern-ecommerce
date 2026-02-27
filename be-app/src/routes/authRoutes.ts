import express from "express";
import { loginController } from "../controllers/auth/login.controller.js";
import { registerController } from "../controllers/auth/register.controller.js";
import { logoutController } from "../controllers/auth/logout.controller.js";


const router = express.Router();

router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/register", registerController);


export default router;
