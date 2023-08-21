import { Router } from "express";

import home from "./home.route.js";
import UserRoute from "./user.route.js";
import authorize from "../middlewares/authorize.js";
const router = Router();

router.use("/user", UserRoute);
router.use(authorize);
router.use("/", home);

export default router;
