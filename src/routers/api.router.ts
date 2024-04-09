import express from "express"
import { getEndpoints } from "../controllers/endpoints.controller";
import topicsRouter from "./topics.router";

const apiRouter = express.Router();

apiRouter.route("/").get(getEndpoints);
apiRouter.use("/topics", topicsRouter);

export default apiRouter;