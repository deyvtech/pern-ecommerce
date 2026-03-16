import express from "express";
import { loginController } from "../controllers/auth/login.controller.js";
import { registerController } from "../controllers/auth/register.controller.js";
import { logoutController } from "../controllers/auth/logout.controller.js";
import { refreshController } from "../controllers/auth/refresh.controller.js";
import { verifyOTPController } from "../controllers/auth/verifyOTP.controller.js";
import { resendOTPController } from "../controllers/auth/resendOTP.controller.js";
import { forgotPasswordController } from "../controllers/auth/forgotPassword.controller.js";
import { resetPasswordController } from "../controllers/auth/resetPassword.controller.js";
// rate limiter
import {
	loginLimit,
	otpLimit,
	refreshLimit,
	forgotPasswordLimit,
	resetPasswordLimit,
} from "../middlewares/rateLimiter.js";

const router = express.Router();
router.post("/login", loginLimit, loginController);
router.post("/logout", logoutController);
router.post("/register", registerController);
router.post("/refresh", refreshLimit, refreshController);
router.post("/verify", verifyOTPController);
router.post("/resend-otp", otpLimit, resendOTPController);
router.post("/forgot-password", forgotPasswordLimit, forgotPasswordController);
router.post("/reset-password", resetPasswordLimit, resetPasswordController);

export default router;
