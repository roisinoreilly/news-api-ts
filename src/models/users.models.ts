import db from "../db/index";
import { UsersSchema, User } from "../schemas/users.schemas";

export const fetchAllUsers = (): Promise<User[]> => {
  return db.query("SELECT * FROM users;").then(({ rows }: { rows: User[] }) => {
    if (!rows || rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not found" });
    }
    const validation = UsersSchema.safeParse(rows);
    if (!validation.success) {
      throw new Error("Validation failed");
    }
    if (validation.success) {
      return rows;
    }
  });
};
