import "dotenv/config";
import { readFileSync } from "fs";
import { ConnectionOptions } from "mysql2";

const mysql: ConnectionOptions = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || undefined,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD_FILE
    ? readFileSync(process.env.DB_PASSWORD_FILE).toString()
    : undefined,
};

console.log(mysql);

export { mysql };
