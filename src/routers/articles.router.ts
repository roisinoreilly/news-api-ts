import express from "express";
import {
  getAllArticles,
  getArticlesById,
  getCommentsById,
} from "../controllers/articles.controller";

const articlesRouter = express.Router();

articlesRouter.route("/:article_id").get(getArticlesById);
articlesRouter.route("/").get(getAllArticles);
articlesRouter.route("/:article_id/comments").get(getCommentsById);

export default articlesRouter;
