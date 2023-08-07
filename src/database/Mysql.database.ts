import { createConnection } from "mysql2";
import { mysql } from "../config/db.keys.js";

const connection = createConnection(mysql);

connection.connect((err) => {
  if (err) {
    console.warn(err);
    return;
  }
  console.log("Database connection successful!");
});

export { connection };
