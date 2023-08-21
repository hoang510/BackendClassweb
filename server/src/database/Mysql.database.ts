import { Connection, createConnection } from "mysql2/promise";
import { mysql } from "../config/db.keys.js";

var connection: Connection;
try {
  connection = await createConnection(mysql);
} catch (err) {
  console.warn(err);
  throw err;
}

export default connection;
