import express from "express";
import jwt from "jsonwebtoken";
import morgan from "morgan";
import { User, getUser } from "./models/User.model.js";
import { randomBytes } from "crypto";
import sha256 from "sha256";

const app = express();
export const ACCESS_TOKEN_SECRET = randomBytes(64).toString("hex");
const SECRET_REFRESH_TOKEN = randomBytes(64).toString("hex");

app.use(express.json());
app.use(morgan("combined"));

function generateAccessToken(user: User) {
  user = { id: user.id, username: user.username };
  return jwt.sign(user, ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });
}

function generateRefreshToken(user: User) {
  user = { ...user, password: undefined };
  return jwt.sign(user, SECRET_REFRESH_TOKEN, {});
}

async function authentication(user: User) {
  const databaseInfo = (
    await getUser({ username: user.username })
  )[0] as User[];
  console.log(databaseInfo);
  if (databaseInfo.length === 0) {
    return { statusCode: 400 };
  } else if (databaseInfo.length !== 1) {
    return { statusCode: 500 };
  } else if (
    !user.password ||
    databaseInfo[0].password !== sha256(user.password)
  ) {
    return { statusCode: 400 };
  } else {
    return {
      statusCode: 200,
      data: generateRefreshToken(databaseInfo[0]),
    };
  }
}

app.post("/token", async (req, res) => {
  const token = req.body.token;
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, SECRET_REFRESH_TOKEN, {}, (err, user) => {
    if (err) return res.json(err);

    console.log(user as unknown as User);
    res.json({
      data: {
        token: generateAccessToken(user as unknown as User),
      },
    });
  });
});

app.post("/login", async (req, res) => {
  const user: User = req.body.userinfo;
  const result = await authentication(user);
  res.status(400).json(result);
});

app.listen(4000, () => {
  console.log("Authentication server is ready on port 4000!");
  console.info("ACCESS TOKEN is ", ACCESS_TOKEN_SECRET);
});
