import express from "express"
import { getEndpoints } from "../controllers/endpoints.controller";

const apiRouter = express.Router();

apiRouter.route("/").get(getEndpoints);

export default apiRouter;