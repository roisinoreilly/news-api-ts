import express from "express";
import { getEndpoints } from "../controllers/endpoints.controller";
import topicsRouter from "./topics.router";
import articlesRouter from "./articles.router";
import commentsRouter from "./comments.router";

const apiRouter = express.Router();

apiRouter.route("/").get(getEndpoints);
apiRouter.route("/api").get(getEndpoints);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter)

export default apiRouter;
