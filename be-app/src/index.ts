import express, { type Request, type Response, type Application } from "express";
import authRoutes from "./routes/authRoutes.js";

import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app: Application = express();
// Global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/auth", authRoutes);
app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

// Error handling middleware
app.use(errorMiddleware);

export default app;
