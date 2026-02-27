import express from "express";
import { adminController } from "../controllers/api/admin.controller.js";
import { me } from "../controllers/api/me.controller.js";

import { verifyRole } from "../middlewares/verifyRole.js";
const apiRouter = express.Router();

apiRouter.get("/me", me);
apiRouter.get("/admin", verifyRole("admin"), adminController);

export default apiRouter;
