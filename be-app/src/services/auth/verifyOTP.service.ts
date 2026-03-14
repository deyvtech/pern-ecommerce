import z from "zod";

import UserModel from "../../model/user.model.js";
import { AppError } from "../../middlewares/error.js";
import { verifyOTPSchema } from "../../schemas/otp.schema.js";

export const verifyUserOTP = async (
	validatedData: z.infer<typeof verifyOTPSchema>,
) => {
	const { email, otp }: z.infer<typeof verifyOTPSchema> = validatedData;
	const existingUser = await UserModel.findByEmail(email);
	if (!existingUser) {
		throw new AppError("User doesn't exist", 400);
	}
	if (existingUser.is_verified) {
		throw new AppError("User is already verified, please login", 400);
	}
	if (existingUser.otp_expires_at < new Date()) {
		throw new AppError("OTP has expired, please request a new one", 400);
	}
	if (existingUser.otp !== otp) {
		throw new AppError("Invalid OTP", 400);
	}
	await UserModel.verifyUser(email);

	return {
		status: 200,
		success: true,
		message: "OTP verified successfully",
	};
};
