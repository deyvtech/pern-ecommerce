import bcrypt from "bcryptjs";
import z from "zod";
// import Model
import UserModel from "../../model/user.model.js";
// import custom error
import { AppError } from "../../middlewares/error.js";
// import schemas
import { registerSchema } from "../../schemas/user.schemas.js";
// import utils
import { generateOTP  } from "../../utils/otpHelper.js";
import { sendOTP } from "../../utils/sendEmail.js";
import logger from "../../utils/loggerHelper.js";
import { hashPassword } from "../../utils/hashPassword.js";
// types
import type { UserResponseType, User } from "../../types/user.types.js";

export const registerUser = async (
	validatedData: z.infer<typeof registerSchema>,
): Promise<UserResponseType> => {
	const {
		username: parsedUsername,
		email: parsedEmail,
		password: parsedPassword,
	}: z.infer<typeof registerSchema> = validatedData;
	// Password Hashing
	const hashedPassword = await hashPassword(parsedPassword);

	// Check if user Exists
	const existingUser = await UserModel.findByEmail(parsedEmail);
	if (existingUser && existingUser.is_verified) {
		throw new AppError("User already exist", 400);
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
		if (emailError) throw new AppError("Email has not been sent", 500);

		// Update OTP and OTP expiry time in database
		await UserModel.updateOTP(existingUser.email, otp);
		const userResponse: UserResponseType = {
			success: true,
			status: 200,
			message:
				"User already exists but not verified. OTP has been resent.",
		};
		return userResponse;
	}
	// Send OTP
	const { emailError } = await sendOTP(parsedUsername, parsedEmail, otp);

	if (emailError) throw new AppError("Email has not been sent", 500);

	// Save User to database
	const user: User = {
		username: parsedUsername,
		email: parsedEmail,
		password: hashedPassword,
		otp: otp,
	};
	await UserModel.create(user);

	// Response to the Client
	logger.info(`User ${user.email} registered successfully`);
	const userResponse: UserResponseType = {
		success: true,
		status: 201,
		message: "Registration successful",
	};
	return userResponse;
};
