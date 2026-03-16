import * as z from "zod";

const registerSchema = z.object({
	username: z
		.string()
		.min(3)
		.max(100, "Username must be between 3 and 100 characters long"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
});

const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
});

const forgotPasswordSchema = z.object({
	email: z.string().email("Invalid email address"),
});
const resetPasswordSchema = z.object({
	password: z.string().min(6, "Password must be at least 6 characters long"),
});

export {
	registerSchema,
	loginSchema,
	forgotPasswordSchema,
	resetPasswordSchema,
};
