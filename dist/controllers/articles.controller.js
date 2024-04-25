"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchArticleById = exports.postCommentByArticleId = exports.getCommentsByArticleId = exports.getAllArticles = exports.getArticlesById = void 0;
const articles_models_1 = require("../models/articles.models");
const getArticlesById = (req, res, next) => {
    const { article_id } = req.params;
    (0, articles_models_1.fetchArticleById)(article_id)
        .then((article) => {
        res.status(200).send({ article });
    })
        .catch(next);
};
exports.getArticlesById = getArticlesById;
const getAllArticles = (req, res, next) => {
    (0, articles_models_1.fetchAllArticles)()
        .then((articles) => {
        res.status(200).send({ articles });
    })
        .catch(next);
};
exports.getAllArticles = getAllArticles;
const getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    const checkIfExists = (0, articles_models_1.fetchArticleById)(article_id);
    Promise.all([checkIfExists, (0, articles_models_1.fetchCommentsById)(article_id)])
        .then(([_, comments]) => {
        res.status(200).send({ comments });
    })
        .catch(next);
};
exports.getCommentsByArticleId = getCommentsByArticleId;
const postCommentByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    const { username, body } = req.body;
    (0, articles_models_1.insertCommentById)(article_id, username, body)
        .then((comment) => {
        res.status(201).send({ comment });
    })
        .catch(next);
};
exports.postCommentByArticleId = postCommentByArticleId;
const patchArticleById = (req, res, next) => {
    const { article_id } = req.params;
    const { inc_votes } = req.body;
    if (!inc_votes) {
        res.status(400).send({ msg: "Bad request" });
    }
    (0, articles_models_1.updateArticleById)(article_id, inc_votes)
        .then((article) => {
        res.status(200).send({ article });
    })
        .catch(next);
};
exports.patchArticleById = patchArticleById;
