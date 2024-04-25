"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentById = void 0;
const index_1 = __importDefault(require("../db/index"));
const deleteCommentById = (comment_id) => {
    return index_1.default
        .query(`SELECT * FROM comments WHERE comment_id = $1`, [comment_id])
        .then(({ rows }) => {
        if (!rows.length) {
            return Promise.reject({ status: 404, msg: "Not found" });
        }
        else {
            return index_1.default.query(`DELETE FROM comments WHERE comment_id = $1`, [
                comment_id,
            ]);
        }
    });
};
exports.deleteCommentById = deleteCommentById;
