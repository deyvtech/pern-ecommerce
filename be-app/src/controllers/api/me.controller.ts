import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../../types/request.types.js";
import { AppError } from "../../middlewares/error.js";
import UserModel from "../../model/user.model.js";

export const me = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	const { sub } = req.userData || {};
	try {
		if (!sub) throw new AppError("Unauthorized", 401);

		const { role } = await UserModel.findById(sub);
		res.json({ success: true, user: { role } });
	} catch (error) {
		next(error);
	}
};
