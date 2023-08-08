import home from "./home.route.js";
import { Router } from "express";

const router = Router();

router.use(home);

export default router;
