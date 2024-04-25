"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsArraySchema = exports.CommentSchema = void 0;
const zod_1 = require("zod");
exports.CommentSchema = zod_1.z.object({
    comment_id: zod_1.z.number().optional(),
    votes: zod_1.z.number(),
    created_at: zod_1.z.string(),
    author: zod_1.z.string(),
    body: zod_1.z.string(),
});
exports.CommentsArraySchema = zod_1.z.array(exports.CommentSchema);
