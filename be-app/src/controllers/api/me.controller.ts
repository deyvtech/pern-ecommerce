import { type Response } from "express";
import type { AuthRequest } from "../../types/request.types.js";
import { getUserById } from "../../services/user.service.js";

export const me = async (req: AuthRequest, res: Response) => {
	const { sub } = req.userData || {};
	try {
		const { role } = await getUserById(sub);
		res.json({ success: true, user: { role } });
	} catch (error) {}
};
