import { Router } from "express";
import { User, addUser, getUser } from "../models/User.model.js";
import { isJSDocNamepathType } from "typescript";

const route = Router();

route.get("/", async (req, res) => {
  res.json({ result: await getUser({ username: "H" }) });
});

route.post("/", async (req, res) => {
  res.json({ result: await addUser(req.body) });
});

export default route;
