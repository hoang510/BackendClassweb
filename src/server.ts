import express from "express";
import morgan from "morgan";
import bcrypt from "bcrypt";
import routes from "./routes/index.route.js";
import { connection } from "./database/Mysql.database.js";
const app = express();

app.use(express.json());
app.use(morgan("tiny"));

bcrypt.hashSync(bcrypt.genSaltSync(), bcrypt.genSaltSync());

app.use(routes);

await connection.promise().ping();
try {
  await connection.promise().query("SELECT * FROM Users");
} catch (err) {
  await connection
    .promise()
    .query("CREATE TABLE Users (id INTEGER PRIMARY KEY)");
}
app.listen(3000, () => {
  console.log("listening on port 3000");
});
