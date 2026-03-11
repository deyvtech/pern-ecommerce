import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

import { getUserByEmail, updateUserOTP } from "../../services/user.service.js";
import { addUser } from "../../services/user.service.js";

import { registerSchema } from "../../schemas/user.schemas.js";

import { AppError } from "../../middlewares/error.js";
import logger from "../../utils/loggerHelper.js";

import type { User } from "../../types/user.types.js";

import { sendOTP, generateOTP } from "../../utils/emailHelper.js";

export const registerController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { username, email, password } = req.body;

	try {
		// Input Validations
		const parsedUser = await registerSchema.parseAsync({
			username,
			email,
			password,
		});

		// Password Hashing
		const saltedPassword = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(
			parsedUser.password,
			saltedPassword,
		);

		// Check if user Exists
		const existingUser = await getUserByEmail(parsedUser.email);
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
				message: "User already exists but not verified. OTP has been resent.",
			})
		}
		// if user not exists
		if (!existingUser) {
			// Send OTP
			const { emailError } = await sendOTP(
				parsedUser.username,
				parsedUser.email,
				otp,
			);

			if (emailError) throw new AppError("Email has not been sent", 401);

			// Save User to database
			const user: User = {
				username: parsedUser.username,
				email: parsedUser.email,
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
