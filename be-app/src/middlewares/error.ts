import type { Request, Response, NextFunction } from "express";
import * as z from "zod";
import logger from "../utils/logger.js";

class AppError extends Error {
	statusCode: number;
	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		Error.captureStackTrace(this, this.constructor);
	}
}
class DatabaseError extends Error {
	statusCode: number;
	constructor(message: string, statusCode: number = 500) {
		super(message);
		this.statusCode = statusCode;
		Error.captureStackTrace(this, this.constructor);
	}
}
export { AppError, DatabaseError };

export const error = (err: any, req: Request, res: Response, next: NextFunction) => {
	// If the headers have already been sent, delegate to the default Express error handler
	if (res.headersSent) {
		return next(err);
	}
	logger.error(err.stack);

	// Handle Zod validation errors
	if (err instanceof z.ZodError) {
		const message = err.issues[0]?.message;
		return res.status(400).json({ success: false, message: message });
	}
	// Handle custom AppError instances
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({ success: false, message: err.message });
	}
	// Handle custom DatabaseError instances
	if (err instanceof DatabaseError) {
		return res.status(err.statusCode || 500).json({ success: false, message: err.message });
	}
	// Handle all other errors as internal server errors
	res.status(err.statusCode || 500).json({
		success: false,
		message: err.message || "Internal Server Error",
	});
};
