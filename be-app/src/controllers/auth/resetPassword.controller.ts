import type { Response, Request, NextFunction } from "express";
import { AppError } from "../../middlewares/error.js";
import { resetPasswordSchema } from "../../schemas/user.schemas.js";
import { resetUserPassword } from "../../services/auth/resetPassword.service.js";

export const resetPasswordController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const validatedData = await resetPasswordSchema.parseAsync(req.body);
		const token = req.query?.token;
		// Check the reset token
		if (!token) throw new AppError("Reset Token is not provided", 400);
		let stringToken;
		if (typeof token === "string") {
			stringToken = token;
		}
		const { status, success, message } = await resetUserPassword(
			validatedData,
			stringToken,
		);
		return res.status(status).json({ success, message });
	} catch (error) {
		next(error);
	}
};
