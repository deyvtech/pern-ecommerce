import type { Request, Response, NextFunction } from "express";
import { resendOTPSchema } from "../../schemas/otp.schema.js";
import { resendUserOTP } from "../../services/auth/resendOTP.service.js";

export const resendOTPController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const validatedData = await resendOTPSchema.parseAsync(req.body);
		const { status, success, message } = await resendUserOTP(validatedData);
		return res.status(status).json({
			success,
			message,
		});
	} catch (error) {
		next(error);
	}
};
