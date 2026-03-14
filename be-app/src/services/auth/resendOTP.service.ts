import z from "zod";

import { generateOTP, sendOTP } from "../../utils/otpHelper.js";
import UserModel from "../../model/user.model.js";
import { AppError } from "../../middlewares/error.js";
import { resendOTPSchema } from "../../schemas/otp.schema.js";

import type { UserResponseType } from "../../types/user.types.js";

export const resendUserOTP = async (
	validatedData: z.infer<typeof resendOTPSchema>,
): Promise<UserResponseType> => {
	const { email }: z.infer<typeof resendOTPSchema> = validatedData;
	const { username } = await UserModel.findByEmail(email);
	const otp = generateOTP();
	const { emailError } = await sendOTP(username, email, otp);
	if (emailError) throw new AppError("Email has not been sent", 401);
	await UserModel.updateOTP(email, otp);
	const userResponse: UserResponseType = {
		status: 200,
		success: true,
		message: "OTP sent successfully",
	};
	return userResponse;
};
