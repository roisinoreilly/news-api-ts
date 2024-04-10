"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchArticleById = void 0;
const index_1 = __importDefault(require("../db/index"));
const fetchArticleById = (article_id) => {
    return index_1.default.query(`SELECT articles.*, COUNT(comments.article_id)::int AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;`, [article_id]).then(({ rows }) => {
        return rows;
    });
};
exports.fetchArticleById = fetchArticleById;
