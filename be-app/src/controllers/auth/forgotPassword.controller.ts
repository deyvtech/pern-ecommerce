import type { Request, Response, NextFunction } from "express";
import { forgotPasswordSchema } from "../../schemas/user.schemas.js";
import { forgotUserPassword } from "../../services/auth/forgotPassword.service.js";

export const forgotPasswordController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const validatedData = await forgotPasswordSchema.parseAsync(req.body);
		const { status, success, message } =
			await forgotUserPassword(validatedData);
			
		res.status(status).json({
			success,
			message,
		});
	} catch (error) {
		next(error);
	}
};
