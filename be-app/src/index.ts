import express, { type Request, type Response, type Application } from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

// Error handling middleware
app.use(errorMiddleware);

export default app;
