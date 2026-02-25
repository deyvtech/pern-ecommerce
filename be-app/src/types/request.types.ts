import type { Request } from "express";
import  type { TokenPayload } from "./tokenPayload.types.js";
export interface AuthRequest extends Request {
	userData?: TokenPayload;
}
