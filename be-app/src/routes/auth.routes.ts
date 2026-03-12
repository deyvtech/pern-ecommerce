import express from "express";
import { loginController } from "../controllers/auth/login.controller.js";
import { registerController } from "../controllers/auth/register.controller.js";
import { logoutController } from "../controllers/auth/logout.controller.js";
import { refreshController } from "../controllers/auth/refresh.controller.js";
import { verifyOTPController } from "../controllers/auth/verifyOTP.controller.js";
import { resendOTPController } from "../controllers/auth/resendOTP.controller.js";

// rate limiter
import { loginLimit, otpLimit, refreshLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();
router.post("/login", loginLimit, loginController);
router.post("/logout", logoutController);
router.post("/register", registerController);
router.post("/refresh", refreshLimiter, refreshController);
router.post("/verify", verifyOTPController);
router.post("/resend-otp", otpLimit, resendOTPController);


export default router;
