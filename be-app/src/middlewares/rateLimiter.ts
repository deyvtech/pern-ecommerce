import rateLimit from "express-rate-limit";
import config from "../config/config.js";

const windowMs = config.rate_limit_window_ms;

const generalLimit = rateLimit({
	windowMs,
	max: config.rate_limit_max,
	standardHeaders: true,
	legacyHeaders: false,
	message: {
		success: false,
		message: "Too many requests. Please try again later.",
	},
});

const loginLimit = rateLimit({
	windowMs,
	max: config.auth_rate_limit_max,
	standardHeaders: true,
	legacyHeaders: false,
	message: {
		success: false,
		message:
			"Too many authentication attempt, Please try again after 15 minutes",
	},
	skipSuccessfulRequests: true,
});

const otpLimit = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 1,
	standardHeaders: true,
	legacyHeaders: false,
	message: {
		success: false,
		message: "Too many OTP request, Please try again after 5 minutes",
	},
});

const forgotPasswordLimit = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 5,
	standardHeaders: true,
	legacyHeaders: false,
	message: {
		success: false,
		message:
			"Too many forgot password requests, Please try again after 1 hour",
	},
});

const resetPasswordLimit = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 5,
	standardHeaders: true,
	legacyHeaders: false,
	message: {
		success: false,
		message:
			"Too many reset password requests, Please try again after 1 hour",
	},
});

const refreshLimit = rateLimit({
	windowMs: 60 * 1000,
	max: 10,
	standardHeaders: true,
	legacyHeaders: false,
	message: {
		success: false,
		message: "Too many token refresh requests.",
	},
});

export {
	generalLimit,
	loginLimit,
	otpLimit,
	refreshLimit,
	forgotPasswordLimit,
	resetPasswordLimit
};
