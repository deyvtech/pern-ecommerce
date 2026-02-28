import express, { type Request, type Response, type Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { error } from "./middlewares/error.js";
import { verifyJWT } from "./middlewares/verifyJWT.js";

import apiRoutes from "./routes/api.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app: Application = express();

// Global middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Routes
app.use("/auth", authRoutes);
app.use("/api/v1", verifyJWT, apiRoutes);
app.use('/auth/aa', (req, res) => {
	console.log(req.cookies)
	res.status(200).json({ success: true, message: "Token is valid" });
});
// 404 Endpoint
app.use(async (req: Request, res: Response) => {
	res.status(404).json({ success: false, message: "404 not found" });
});
// Error handling middleware
app.use(error);

export default app;
