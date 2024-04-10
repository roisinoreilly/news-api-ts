import express from "express"
import { getAllArticles, getArticlesById } from "../controllers/articles.controller";

const articlesRouter = express.Router();

articlesRouter.route("/:article_id").get(getArticlesById);
articlesRouter.route("/").get(getAllArticles)

export default articlesRouter;