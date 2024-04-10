import express from "express";
import {
  getAllArticles,
  getArticlesById,
  getCommentsByArticleId,
} from "../controllers/articles.controller";

const articlesRouter = express.Router();

articlesRouter.route("/:article_id").get(getArticlesById);
articlesRouter.route("/").get(getAllArticles);
articlesRouter.route("/:article_id/comments").get(getCommentsByArticleId);

export default articlesRouter;
