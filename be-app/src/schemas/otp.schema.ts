import * as z from "zod";

const verifyOTPSchema = z.object({
	email: z.string().email("Invalid email address"),
	otp: z
		.string()
		.min(6, "OTP must be at least 6 characters long")
		.max(6, "OTP must be at most 6 characters long"),
});

const resendOTPSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export { verifyOTPSchema, resendOTPSchema };
