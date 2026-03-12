import type { Request, Response, NextFunction } from "express";
import type { TokenPayload } from "./token.types.js";
export interface AuthRequest extends Request {
	userData?: TokenPayload;
}