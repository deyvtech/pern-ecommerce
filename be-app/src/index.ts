import express, { type Request, type Response, type Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";

import { error } from "./middlewares/error.js";
import { verifyJWT } from "./middlewares/verifyJWT.js";

import apiRoutes from "./routes/apiRoutes.js";

const app: Application = express();
// Global middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Routes
app.use("/auth", authRoutes);
app.use("/api/v1", verifyJWT, apiRoutes);
// 404 Endpoint
app.use((req: Request, res: Response) => {
	res.status(404).json({ success: false, message: "404 not found" });
});
// Error handling middleware
app.use(error);

export default app;
