import { Request, Response, NextFunction } from "express";
import { deleteCommentById } from "../models/comments.models";

export const removeCommentById = (
    req: Request<{ id: string}>,
    res: Response,
    next: NextFunction) => {
      const { id } = req.params;
      deleteCommentById(id)
      .then(() => {
        res.status(204).send();
      })
      .catch(next);
  }