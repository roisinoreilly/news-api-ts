import { QueryResult } from "pg";
import db from "../db/index";
import { Comment } from "../schemas/comments.schemas";

export const deleteCommentById = (comment_id: string): Promise<void> => {
  return db
    .query(`SELECT * FROM comments WHERE comment_id = $1`, [comment_id])
    .then(({ rowCount }) => {
      if (!rowCount) {
        return Promise.reject({ status: 404, msg: "Not found" });
      } else {
        return db.query(`DELETE FROM comments WHERE comment_id = $1`, [
          comment_id,
        ]);
      }
    }).then(() => {
      return;
    })
};
