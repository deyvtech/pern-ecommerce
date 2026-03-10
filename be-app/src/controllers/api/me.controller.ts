import { type Response } from "express";
import type { AuthRequest } from "../../types/request.types.js";

export const me = (req: AuthRequest, res: Response) => {
	const { sub } = req.userData || {};
	res.json({ success: true, user: { sub } });
};
