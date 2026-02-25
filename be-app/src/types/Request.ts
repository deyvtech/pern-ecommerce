import type { Request } from "express";

export interface DecodedObject {
    sub: string;
    role: string;
    name: string;
}
export interface AuthRequest extends Request {
    userData?: DecodedObject;
}