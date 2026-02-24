import type { Request, Response, NextFunction } from "express";
import * as z from "zod";
import logger from "../utils/logger.js";

export const error = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);
    if (err instanceof z.ZodError) {
        const message = err.issues[0]?.message; 
        return res.status(400).json({ success: false, error: message });
    }
  res.status(err.statusCode || 500).json({ success: false, message: err.message || "Internal Server Error" });
};