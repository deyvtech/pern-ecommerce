import type { Request, Response, NextFunction } from "express";
import { verifyOTPSchema } from "../../schemas/otp.schema.js";
import { verifyUserOTP } from "../../services/auth/verifyOTP.service.js";

export const verifyOTPController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const validatedData = await verifyOTPSchema.parseAsync(req.body);
		const { status, success, message } = await verifyUserOTP(validatedData);

		return res.status(status).json({
			success,
			message,
		});
	} catch (error) {
		next(error);
	}
};
