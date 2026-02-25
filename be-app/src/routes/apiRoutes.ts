import express from "express";
import { adminController } from "../controllers/api/adminController.js";
import { me } from "../controllers/api/me.js";

import { verifyRole } from "../middlewares/verifyRole.js";
const apiRouter = express.Router();

apiRouter.get("/me",  me);
apiRouter.get("/admin", verifyRole("admin"), adminController);

export default apiRouter;
