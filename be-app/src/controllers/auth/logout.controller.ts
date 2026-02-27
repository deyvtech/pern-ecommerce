import config from "../../config.js";
import logger from "../../utils/logger.js";

export const logoutController = (req: any, res: any) => {
	const isProduction = config.env === "production";

	res.clearCookie("jwt", {
		httpOnly: true,
		expires: new Date(0),
		secure: isProduction,
		sameSite: "lax",
	});
	logger.info("User logged out successfully");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};
