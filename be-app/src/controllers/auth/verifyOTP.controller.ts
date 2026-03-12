import type { Request, Response, NextFunction } from "express";
import { verifyOTPSchema } from "../../schemas/otp.schema.js";
import { AppError } from "../../middlewares/error.js";
import { getUserByEmail, verifyUserOTP } from "../../services/user.service.js";

export const verifyOTPController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email, otp } = await verifyOTPSchema.parseAsync(req.body);
		const existingUser = await getUserByEmail(email);
		if (!existingUser) {
			throw new AppError("Invalid email or OTP", 401);
		}
		if (existingUser.is_verified) {
			throw new AppError("User is already verified, please login", 401);
		}
		if (existingUser.otp_expires_at < new Date()) {
			throw new AppError(
				"OTP has expired, please request a new one",
				401,
			);
		}
		if (existingUser.otp !== otp) {
			throw new AppError("Invalid email or OTP", 401);
		}
		await verifyUserOTP(email);

		return res.status(200).json({
			success: true,
			message: "OTP verified successfully",
		});
	} catch (error) {
		next(error);
	}
};
