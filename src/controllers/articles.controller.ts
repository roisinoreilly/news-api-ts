import { Request, Response, NextFunction } from "express";
import {
  fetchAllArticles,
  fetchArticleById,
  fetchCommentsById,
  insertCommentById,
} from "../models/articles.models";
import { Article } from "../types";

export const getArticlesById = (
  req: Request<{ article_id: string}>,
  res: Response,
  next: NextFunction
) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((article: Article[]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

export const getAllArticles = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  fetchAllArticles()
    .then((articles: Article[]) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

export const getCommentsByArticleId = (
  req: Request<{ article_id: string}>,
  res: Response,
  next: NextFunction
) => {
  const { article_id } = req.params;
  const checkIfExists = fetchArticleById(article_id);
  Promise.all([checkIfExists, fetchCommentsById(article_id)])
    .then(([_, comments]) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

export const postCommentByArticleId = (
  req: Request<{ article_id: string}>,
  res: Response,
  next: NextFunction
) => {
  const { article_id } = req.params;
  const {username, body} = req.body;

  insertCommentById(article_id, username, body)
  .then((comment: Comment) => {
    res.status(201).send({comment})
  })
  .catch(next);
}