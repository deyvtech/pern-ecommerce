import type { Request, Response, NextFunction } from "express";
import { registerSchema } from "../../schemas/user.schemas.js";
import { registerUser } from "../../services/auth/register.service.js";
export const registerController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		// Input Validations
		const validatedData = await registerSchema.parseAsync(req.body);
		const { status, success, message } = await registerUser(validatedData);

		return res.status(status).json({ success, message });
	} catch (error) {
		next(error);
	}
};
