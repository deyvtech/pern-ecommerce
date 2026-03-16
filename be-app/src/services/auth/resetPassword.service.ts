import z from "zod";
import { AppError } from "../../middlewares/error.js";
import { resetPasswordSchema } from "../../schemas/user.schemas.js";
import { hashPassword } from "../../utils/hashPassword.js";
import { hashToken } from "../../utils/tokenHelper.js";
import UserModel from "../../model/user.model.js";
import type { UserResponseType } from "../../types/user.types.js";

export const resetUserPassword = async (
	validatedData: z.infer<typeof resetPasswordSchema>,
	token: string | undefined,
) => {
	const { password }: z.infer<typeof resetPasswordSchema> = validatedData;
	if (!token) throw new AppError("Reset Token is not provided", 400);
	let resetHashToken: string | undefined = hashToken(token);

	// Check if token is valid
	const user = await UserModel.findByToken(resetHashToken);
	if (!user) throw new AppError("Invalid token", 400);
	if (user.reset_token_expires_at < Date.now())
		throw new AppError("Token is expired", 400);
	// Hash the password
	const hashedPassword = await hashPassword(password);
	// Update Password To the Database
	await UserModel.updateUserPassword(hashedPassword, user.id);
	// Update Reset token as null
	await UserModel.updateResetToken(user.id);
	// Return a successful message
	const userResponse: UserResponseType = {
		status: 200,
		success: true,
		message: "Change password successfully",
	};
	return userResponse;
};
