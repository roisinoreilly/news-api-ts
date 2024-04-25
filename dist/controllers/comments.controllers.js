"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCommentById = void 0;
const comments_models_1 = require("../models/comments.models");
const removeCommentById = (req, res, next) => {
    const { id } = req.params;
    (0, comments_models_1.deleteCommentById)(id)
        .then(() => {
        res.status(204).send();
    })
        .catch(next);
};
exports.removeCommentById = removeCommentById;
