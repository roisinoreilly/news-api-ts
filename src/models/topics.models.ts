import db from "../db/index";
import { Topic } from "../types";

export const fetchAllTopics = () => {
  return db
    .query(`SELECT * FROM topics`)
    .then(({ rows }: { rows: Topic[] }) => {
      return rows;
    });
};
