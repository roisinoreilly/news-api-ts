import db from "../db/index";
import { User } from "../types";

export const fetchAllUsers = (): Promise<User[]> => {
  return db.query("SELECT * FROM users;").then(({ rows }: { rows: User[] }) => {
    return rows;
  });
};
