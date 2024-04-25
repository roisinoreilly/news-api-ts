import db from "../db/index";
import {
  ArticlesArraySchema,
  Article,
  ArticleSchema,
} from "../schemas/articles.schemas";
import {
  CommentsArraySchema,
  Comment,
  CommentSchema,
} from "../schemas/comments.schemas";

export const fetchArticleById = (article_id: string): Promise<Article[]> => {
  return db
    .query(
      `SELECT 
      articles.article_id, 
      articles.title, 
      articles.topic, 
      articles.author, 
      articles.body, 
      articles.created_at, 
      COALESCE(articles.votes, 0) AS votes, 
      COUNT(comments.article_id)::int AS comment_count 
  FROM 
      articles 
  LEFT JOIN 
      comments ON articles.article_id = comments.article_id 
  WHERE 
      articles.article_id = $1 
  GROUP BY 
      articles.article_id;
  `,
      [article_id]
    )
    .then(({ rows }: { rows: Article[] }) => {
      if (!rows || rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      const validation = ArticleSchema.safeParse(rows[0]);
      if (!validation.success) {
        throw new Error("Validation failed");
      }
      if (validation.success) {
        return rows;
      }
    });
};

export const fetchAllArticles = (): Promise<Article[]> => {
  return db
    .query(
      `SELECT 
      articles.article_id, 
      articles.title, 
      articles.topic, 
      articles.author, 
      articles.created_at, 
      COALESCE(articles.votes, 0) AS votes,
      COUNT(comments.article_id) AS comment_count
  FROM 
      articles
  LEFT JOIN 
      comments ON articles.article_id = comments.article_id
  GROUP BY 
      articles.article_id
  ORDER BY 
      articles.created_at DESC;
    `
    )
    .then(({ rows }: { rows: Article[] }) => {
      if (!rows || rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      const validation = ArticlesArraySchema.safeParse(rows);
      if (!validation.success) {
        throw new Error("Validation failed");
      }
      if (validation.success) {
        return rows;
      }
    });
};

export const fetchCommentsById = (article_id: string): Promise<Comment[]> => {
  return db
    .query(`SELECT * FROM comments WHERE article_id = $1;`, [article_id])
    .then(({ rows }: { rows: Comment[] }) => {
      const validation = CommentsArraySchema.safeParse(rows);
      if (!validation.success) {
        throw new Error("Validation failed");
      }
      if (validation.success) {
        return rows;
      }
    });
};

export const insertCommentById = (
  article_id: string,
  username: string,
  body: string
): Promise<Comment> => {
  if (!username || !body) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  } else {
    return db
      .query(
        `INSERT INTO comments (body, article_id, author) VALUES ($1, $2, $3) RETURNING *;`,
        [body, article_id, username]
      )
      .then(({ rows }: { rows: Comment[] }) => {
        const validation = CommentSchema.safeParse(rows[0]);
        if (!validation.success) {
          throw new Error("Validation failed");
        }
        if (validation.success) {
          return rows[0];
        }
      });
  }
};

export const updateArticleById = (
  article_id: string,
  inc_votes: number
): Promise<Article> => {
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`,
      [inc_votes, article_id]
    )
    .then(({ rows }: { rows: Article[] }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      const validation = CommentSchema.safeParse(rows[0]);
      if (!validation.success) {
        throw new Error("Validation failed");
      }
      if (validation.success) {
        return rows[0];
      }
    });
};