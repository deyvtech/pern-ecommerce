import { type Response } from "express";
import type { AuthRequest } from "../../types/request.types.js";

export const me = (req: AuthRequest, res: Response) => {
	const { role, name } = req.userData || {};
	res.json({ success: true, user: { role, name } });
};
