import type { Request, Response, NextFunction } from "express";
import { generateOTP, sendOTP } from "../../utils/otpHelper.js";
import { getUserByEmail } from "../../services/user.service.js";
import { updateUserOTP } from "../../services/user.service.js";
import { AppError } from "../../middlewares/error.js";
import { resendOTPSchema } from "../../schemas/otp.schema.js";

export const resendOTPController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email } = await resendOTPSchema.parseAsync(req.body);
		const { username } = await getUserByEmail(email);
		const otp = generateOTP();
		const { emailError } = await sendOTP(username, email, otp);
		if (emailError) throw new AppError("Email has not been sent", 401);
		await updateUserOTP(email, otp);
		return res.status(200).json({
			message: "OTP sent successfully",
		});
	} catch (error) {
		next(error);
	}
};
