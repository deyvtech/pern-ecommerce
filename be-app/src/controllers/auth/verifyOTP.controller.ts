import type { Request, Response, NextFunction } from "express";
import { verifyOTPSchema } from "../../schemas/user.schemas.js";
import { AppError } from "../../middlewares/error.js";
import { getUserByEmail, verifyUserOTP } from "../../services/user.service.js";
export const verifyOTPController = async (req: Request, res: Response, next: NextFunction) => {
	const { email, otp } = req.body;
	try {
		const { email: parsedEmail, otp: parsedOTP } =
			await verifyOTPSchema.parseAsync({
				email,
				otp,
			});

        const existingUser = await getUserByEmail(parsedEmail);
        if (!existingUser) {
            throw new AppError("Invalid email or OTP", 401);
        }
        if(existingUser.is_verified) {
            throw new AppError("User is already verified, please login", 401);
        }
        if(existingUser.otp_expires_at < new Date()) {
            throw new AppError("OTP has expired, please request a new one", 401);
        }
        if(existingUser.otp !== parsedOTP) {
            throw new AppError("Invalid email or OTP", 401);
        }
        await verifyUserOTP(parsedEmail);

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully",
        });

	} catch (error) {
        next(error);
    }
};
