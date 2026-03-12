import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

import { getUserByEmail, updateUserOTP } from "../../services/user.service.js";
import { addUser } from "../../services/user.service.js";

import { registerSchema } from "../../schemas/user.schemas.js";

import { AppError } from "../../middlewares/error.js";
import logger from "../../utils/loggerHelper.js";

import type { User } from "../../types/user.types.js";

import { sendOTP, generateOTP } from "../../utils/otpHelper.js";

export const registerController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		// Input Validations
		const {
			username: parsedUsername,
			email: parsedEmail,
			password: parsedPassword,
		} = await registerSchema.parseAsync(req.body);

		// Password Hashing
		const saltedPassword = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(
			parsedPassword,
			saltedPassword,
		);

		// Check if user Exists
		const existingUser = await getUserByEmail(parsedEmail);
		if (existingUser && existingUser.is_verified) {
			throw new AppError("User already exist", 401);
		}

		const otp = generateOTP();

		// If user exists
		if (
			existingUser &&
			!existingUser.is_verified &&
			existingUser.otp_expires_at < new Date()
		) {
			// Send OTP
			const { emailError } = await sendOTP(
				existingUser.username,
				existingUser.email,
				otp,
			);
			if (emailError) throw new AppError("Email has not been sent", 401);

			// Update OTP and OTP expiry time in database
			await updateUserOTP(existingUser.email, otp);

			return res.status(200).json({
				success: true,
				message:
					"User already exists but not verified. OTP has been resent.",
			});
		}
		// if user not exists
		if (!existingUser) {
			// Send OTP
			const { emailError } = await sendOTP(
				parsedUsername,
				parsedEmail,
				otp,
			);

			if (emailError) throw new AppError("Email has not been sent", 401);

			// Save User to database
			const user: User = {
				username: parsedUsername,
				email: parsedEmail,
				password: hashedPassword,
				otp: otp,
			};
			await addUser(user);

			// Response to the Client
			logger.info(`User ${user.email} registered successfully`);
			return res
				.status(201)
				.json({ success: true, message: "Registration successful" });
		}
	} catch (error) {
		next(error);
	}
};
