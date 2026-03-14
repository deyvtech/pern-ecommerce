import { loginSchema } from "../../schemas/user.schemas.js";
import type { Request, Response, NextFunction } from "express";

import { loginUser } from "../../services/auth/login.service.js";

export const loginController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		// Input Validation
		const validatedData = await loginSchema.parseAsync(req.body);
		const { status, success, message, token, user } = await loginUser(
			validatedData,
			req,
			res,
		);
		return res.status(status).json({ success, message, token, user });
	} catch (error: any) {
		next(error);
	}
};
