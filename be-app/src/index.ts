import express, {
	type Request,
	type Response,
	type Application,
} from "express";
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

// Global rate limiter
import { generalLimit } from "./middlewares/rateLimiter.js";

// Routes
app.use("/auth", authRoutes);
app.use("/api/v1", generalLimit, verifyJWT, apiRoutes);
// app.use("/", (req: Request, res: Response) => {
// 	res.json({ success: true, message: "Welcome to the API" });
// });
// 404 Endpoint
app.use(async (req: Request, res: Response) => {
	res.status(404).json({ success: false, message: "404 not found" });
});
// Error handling middleware
app.use(error);

export default app;
