import express from "express"
import { getArticlesById } from "../controllers/articles.controller";

const articlesRouter = express.Router();

articlesRouter.route("/:article_id").get(getArticlesById);

export default articlesRouter;