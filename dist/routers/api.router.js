"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const endpoints_controller_1 = require("../controllers/endpoints.controller");
const topics_router_1 = __importDefault(require("./topics.router"));
const articles_router_1 = __importDefault(require("./articles.router"));
const apiRouter = express_1.default.Router();
apiRouter.route("/").get(endpoints_controller_1.getEndpoints);
apiRouter.use("/topics", topics_router_1.default);
apiRouter.use("/articles", articles_router_1.default);
exports.default = apiRouter;
