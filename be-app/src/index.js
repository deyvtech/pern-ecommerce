import express from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

app.get("/", (req, res) => {
	res.send("Hello World!1");
});

// Error handling middleware
app.use(errorMiddleware);

export default app;
