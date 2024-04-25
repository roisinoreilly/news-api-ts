"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comments_controllers_1 = require("../controllers/comments.controllers");
const commentsRouter = express_1.default.Router();
commentsRouter.route("/:id").delete(comments_controllers_1.removeCommentById);
exports.default = commentsRouter;
