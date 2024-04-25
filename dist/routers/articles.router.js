"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const articles_controller_1 = require("../controllers/articles.controller");
const articlesRouter = express_1.default.Router();
articlesRouter.route("/").get(articles_controller_1.getAllArticles);
articlesRouter
    .route("/:article_id")
    .get(articles_controller_1.getArticlesById)
    .patch(articles_controller_1.patchArticleById);
articlesRouter
    .route("/:article_id/comments")
    .get(articles_controller_1.getCommentsByArticleId)
    .post(articles_controller_1.postCommentByArticleId);
exports.default = articlesRouter;
