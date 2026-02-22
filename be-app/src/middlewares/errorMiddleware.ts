import type { Request, Response} from "express";
import * as z from "zod";
export const errorMiddleware = (err: any, req: Request, res: Response) => {
  console.error(err.stack);
    if (err instanceof z.ZodError) {
        const message = err.issues[0]?.message; 
        return res.status(400).json({ success: false, error: message });
    }
  res.status(err.statusCode || 500).json({ success: false, message: err.message || "Internal Server Error" });
};