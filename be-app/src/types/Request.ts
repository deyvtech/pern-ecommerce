import type { Request } from "express";

export interface AuthRequest extends Request {
    userData?: { sub: string, role: string, name: string };
}