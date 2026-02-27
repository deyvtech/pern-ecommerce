import type { Request } from "express";
import type { TokenPayload } from "./token.types.js";
export interface AuthRequest extends Request {
	userData?: TokenPayload;
}
