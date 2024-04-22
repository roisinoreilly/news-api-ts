import express from "express";
import {
  getAllArticles,
  getArticlesById,
  getCommentsByArticleId,
  patchArticleById,
  postCommentByArticleId,
} from "../controllers/articles.controller";

const articlesRouter = express.Router();

articlesRouter.route("/").get(getAllArticles);
articlesRouter.route("/:article_id")
.get(getArticlesById)
.patch(patchArticleById)

articlesRouter
.route("/:article_id/comments")
.get(getCommentsByArticleId)
.post(postCommentByArticleId)

export default articlesRouter;
