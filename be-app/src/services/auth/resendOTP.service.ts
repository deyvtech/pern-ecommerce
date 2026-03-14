import z from "zod";

import { generateOTP } from "../../utils/otpHelper.js";
import { sendOTP } from "../../utils/sendEmail.js";
import UserModel from "../../model/user.model.js";
import { AppError } from "../../middlewares/error.js";
import { resendOTPSchema } from "../../schemas/otp.schema.js";

import type { UserResponseType } from "../../types/user.types.js";

export const resendUserOTP = async (
	validatedData: z.infer<typeof resendOTPSchema>,
): Promise<UserResponseType> => {
	const { email }: z.infer<typeof resendOTPSchema> = validatedData;
	const existingUser = await UserModel.findByEmail(email);
	if (!existingUser) throw new AppError("User doesn't exist", 400);
	const otp = generateOTP();
	const { emailError } = await sendOTP(existingUser.username, email, otp);
	if (emailError) throw new AppError("Email has not been sent", 500);
	await UserModel.updateOTP(email, otp);
	const userResponse: UserResponseType = {
		status: 200,
		success: true,
		message: "OTP sent successfully",
	};
	return userResponse;
};
