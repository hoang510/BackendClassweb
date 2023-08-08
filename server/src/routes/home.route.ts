import { Router } from "express";

const route = Router();

route.get("/", (req, res) => {
  res.json({ success: true });
});

export default route;
