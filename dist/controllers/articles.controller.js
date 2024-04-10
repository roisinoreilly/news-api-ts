"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticlesById = void 0;
const articles_models_1 = require("../models/articles.models");
const getArticlesById = (req, res) => {
    const { article_id } = req.params;
    (0, articles_models_1.fetchArticleById)(article_id).then((article) => {
        res.status(200).send({ article });
    });
};
exports.getArticlesById = getArticlesById;
