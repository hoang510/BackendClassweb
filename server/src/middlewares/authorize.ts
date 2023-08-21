import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../authServer.js";

async function middleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, ACCESS_TOKEN_SECRET, {}, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log(user);
    next();
  });
}

export default middleware;
