import config from "../config.js";
import jwt from "jsonwebtoken";
import type { Token } from "../types/Token.js";
import type { Response } from "express";

export const generateToken = ({ sub, role, name }: Token, res: Response) => {
	const token = jwt.sign({ sub, role, name }, config.jwt_secret, {
		expiresIn: config.jwt_expires_in || "7d",
	});

    if(token) {
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: config.env === 'development',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days in milliseconds
        })
    }
};
