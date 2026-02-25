import type { Request, Response } from "express";
export const adminController = (req: Request, res: Response) => {
	res.json({ success: true, message: "Welcome, admin!" });
};
