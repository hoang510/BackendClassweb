import db from "../database/Mysql.database.js";
import sha256 from "sha256";

export interface User {
  id?: number;
  username?: string;
  password?: string;
}

async function getUser(user?: User) {
  const query = `SELECT * FROM Users WHERE ?`;
  return await db.query(query, [user]);
}

async function addUser(user: User) {
  const query = `INSERT INTO Users (username, password) VALUES (
    '${user.username}', '${sha256(user.password as string)}')`;
  return await db.query(query);
}

async function updateUser(id: number, user: User) {
  const query = "UPDATE";
}

async function deleteUser(id: number) {
  const query = "DELETE FROM Users WHERE id=?";
  return await db.query(query, id);
}

export { addUser, getUser, deleteUser };
