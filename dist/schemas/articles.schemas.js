"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesArraySchema = exports.ArticleSchema = void 0;
const zod_1 = require("zod");
exports.ArticleSchema = zod_1.z.object({
    article_id: zod_1.z.number(),
    title: zod_1.z.string(),
    topic: zod_1.z.string(),
    author: zod_1.z.string(),
    body: zod_1.z.string().optional(),
    created_at: zod_1.z.string(),
    votes: zod_1.z.number(),
    comment_count: zod_1.z.union([zod_1.z.number(), zod_1.z.string()]),
});
exports.ArticlesArraySchema = zod_1.z.array(exports.ArticleSchema);
