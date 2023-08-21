import express from "express";
import morgan from "morgan";
import routes from "./routes/index.route.js";
import db from "./database/Mysql.database.js";
import jwt from "jsonwebtoken";
const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.use(routes);

await db.ping();

app.listen(3000, () => {
  console.log("listening on port 3000");
});

console.log(process.env.DB_PASSWORD_FILE);
