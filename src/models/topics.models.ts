import db from "../db/index";
import { Topic, TopicsArraySchema } from "../schemas/topics.schemas";

export const fetchAllTopics = (): Promise<Topic[]> => {
  return db
    .query(`SELECT * FROM topics`)
    .then(({ rows }: { rows: Topic[] }) => {
      if (!rows || rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      const validation = TopicsArraySchema.safeParse(rows);
      if (!validation.success) {
        throw new Error("Validation failed");
      }
      if (validation.success) {
        return rows;
      }
    });
};
