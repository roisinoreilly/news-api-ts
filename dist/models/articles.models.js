"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateArticleById = exports.insertCommentById = exports.fetchCommentsById = exports.fetchAllArticles = exports.fetchArticleById = void 0;
const index_1 = __importDefault(require("../db/index"));
const articles_schemas_1 = require("../schemas/articles.schemas");
const comments_schemas_1 = require("../schemas/comments.schemas");
const fetchArticleById = (article_id) => {
    return index_1.default
        .query(`SELECT 
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
  `, [article_id])
        .then(({ rows }) => {
        if (!rows || rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Not found" });
        }
        const validation = articles_schemas_1.ArticleSchema.safeParse(rows[0]);
        if (!validation.success) {
            throw new Error("Validation failed");
        }
        if (validation.success) {
            return rows;
        }
    });
};
exports.fetchArticleById = fetchArticleById;
const fetchAllArticles = () => {
    return index_1.default
        .query(`SELECT 
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
    `)
        .then(({ rows }) => {
        if (!rows || rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Not found" });
        }
        const validation = articles_schemas_1.ArticlesArraySchema.safeParse(rows);
        if (!validation.success) {
            throw new Error("Validation failed");
        }
        if (validation.success) {
            return rows;
        }
    });
};
exports.fetchAllArticles = fetchAllArticles;
const fetchCommentsById = (article_id) => {
    return index_1.default
        .query(`SELECT * FROM comments WHERE article_id = $1;`, [article_id])
        .then(({ rows }) => {
        const validation = comments_schemas_1.CommentsArraySchema.safeParse(rows);
        if (!validation.success) {
            throw new Error("Validation failed");
        }
        if (validation.success) {
            return rows;
        }
    });
};
exports.fetchCommentsById = fetchCommentsById;
const insertCommentById = (article_id, username, body) => {
    if (!username || !body) {
        return Promise.reject({ status: 400, msg: "Bad request" });
    }
    else {
        return index_1.default
            .query(`INSERT INTO comments (body, article_id, author) VALUES ($1, $2, $3) RETURNING *;`, [body, article_id, username])
            .then(({ rows }) => {
            const validation = comments_schemas_1.CommentSchema.safeParse(rows[0]);
            if (!validation.success) {
                throw new Error("Validation failed");
            }
            if (validation.success) {
                return rows[0];
            }
        });
    }
};
exports.insertCommentById = insertCommentById;
const updateArticleById = (article_id, inc_votes) => {
    return index_1.default
        .query(`UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`, [inc_votes, article_id])
        .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Not found" });
        }
        const validation = comments_schemas_1.CommentSchema.safeParse(rows[0]);
        if (!validation.success) {
            throw new Error("Validation failed");
        }
        if (validation.success) {
            return rows[0];
        }
    });
};
exports.updateArticleById = updateArticleById;
