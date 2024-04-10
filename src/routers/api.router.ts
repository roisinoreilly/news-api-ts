import express from "express"
import { getEndpoints } from "../controllers/endpoints.controller";
import topicsRouter from "./topics.router";
import articlesRouter from "./articles.router";

const apiRouter = express.Router();

apiRouter.route("/").get(getEndpoints);
apiRouter.route("/api").get(getEndpoints);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);

export default apiRouter;