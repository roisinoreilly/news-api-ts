import db from "../db/index";

export const deleteCommentById = (
    comment_id: string
  ) => {
    return db
    .query(`SELECT * FROM comments WHERE comment_id = $1`, [comment_id])
        .then(({ rows }: { rows: [] }) => {
            if (!rows.length) {
                return Promise.reject({ status: 404, msg: "Not found" });
            } else {
                return db.query(`DELETE FROM comments WHERE comment_id = $1`, [
                    comment_id,
                ]);
            }
        });
  }