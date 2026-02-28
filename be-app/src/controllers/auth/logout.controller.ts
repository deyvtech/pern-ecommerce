import config from "../../config.js";
import logger from "../../utils/loggerHelper.js";
import { hashToken } from "../../utils/tokenHelper.js";
import { revokeUserTokens } from "../../services/token.service.js";

export const logoutController = (req: any, res: any) => {
	console.log(req.cookies)
	const token = req.cookies?.jwt;
	if (!token) {
		return res.status(204)
	}
	const tokenHash = hashToken(token);
	revokeUserTokens(tokenHash);
	res.clearCookie("jwt", {
		httpOnly: true,
		secure: config.env === "production",
		sameSite: "none",
		path: '/auth/refresh',
	});
	logger.info("User logged out successfully");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};
