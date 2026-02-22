import type { Request, Response, NextFunction } from "express";
import * as z from "zod";
import bcrypt from "bcrypt";

import { generateToken } from "../../utils/generateToken.js";
import { getUserByEmail } from "../../model/getUserByEmail.js";
import type { Token } from "../../types/Token.js";

const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
});
export const loginController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { email, password } = req.body;
	try {
		const { email: parsedEmail, password: parsedPassword } =
			await loginSchema.parseAsync({ email, password });

		const existingUser = await getUserByEmail(parsedEmail);
		if (!existingUser) {
			return res
				.status(401)
				.json({ success: false, message: "Invalid email or password" });
		}

		const comparePassword = await bcrypt.compare(
			parsedPassword,
			existingUser.password_hash,
		);

		if (!comparePassword) {
			return res
				.status(401)
				.json({ success: false, message: "Invalid email or password" });
		}
		const payload: Token = {
			sub: existingUser.id,
			role: existingUser.role,
			name: existingUser.fullname,
		};
		generateToken(payload, res);
		return res
			.status(200)
			.json({ success: true, message: "Login successful" });
	} catch (error: any) {
		next(error);
	}
};
