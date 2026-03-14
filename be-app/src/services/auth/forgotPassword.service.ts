import z from "zod";
import UserModel from "../../model/user.model.js";
import { AppError } from "../../middlewares/error.js";
import { sendResetPassword } from "../../utils/sendEmail.js";
import type { UserResponseType } from "../../types/user.types.js";
import { resetPasswordSchema } from "../../schemas/user.schemas.js";
import {
	createJti as createResetToken,
	hashToken,
} from "../../utils/tokenHelper.js";
import config from "../../config/config.js";

export const forgotUserPassword = async (
	validatedData: z.infer<typeof resetPasswordSchema>,
): Promise<UserResponseType> => {
	const { email }: z.infer<typeof resetPasswordSchema> = validatedData;
	const existingUser = await UserModel.findByEmail(email);

	if (!existingUser) {
		throw new AppError("User doesn't exist", 400);
	}

	const resetToken = createResetToken();
	const resetTokenHash = hashToken(resetToken);
	await UserModel.createUserResetToken(resetTokenHash, existingUser.email)

	const resetLink = `${config.frontend_url}/reset-password?token=${resetToken}`;
	const { emailError } = await sendResetPassword(
		existingUser.username,
		existingUser.email,
		resetLink,
	);
	if (emailError) throw new AppError("Email has not been sent", 500);

	const userResponse: UserResponseType = {
		status: 200,
		success: true,
		message:
			"Forgot Password successfully, We send you an email for reset Link",
	};
	return userResponse;
};
