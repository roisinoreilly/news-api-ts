import express from "express"
import { removeCommentById } from "../controllers/comments.controllers";

const commentsRouter = express.Router()

commentsRouter.route("/:id").delete(removeCommentById)

export default commentsRouter;