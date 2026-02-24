import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

import { generateToken } from "../../utils/generateToken.js";
import { getUserByEmail } from "../../model/getUserByEmail.js";
import type { Token } from "../../types/Token.js";
import { loginSchema } from "../../validators/userValidator.js";
import { updateLogin } from "../../model/updateLogin.js";

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
		// update user database
		await updateLogin(existingUser.id);
		return res
			.status(200)
			.json({ success: true, message: "Login successful" });
	} catch (error: any) {
		next(error);
	}
};
