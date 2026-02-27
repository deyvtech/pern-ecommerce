import config from "../../config.js";
import logger from "../../utils/loggerHelper.js";

export const logoutController = (req: any, res: any) => {
	res.clearCookie("jwt", {
		httpOnly: true,
		secure: config.env === "production",
		sameSite: "lax",
		path: '/auth/refresh',
	});
	logger.info("User logged out successfully");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};
