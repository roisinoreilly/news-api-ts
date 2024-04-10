import {Request, Response} from "express";
import { fetchArticleById } from "../models/articles.models";
import { Article } from "../types";

export const getArticlesById = (req: Request, res: Response) => {
    const {article_id} = req.params
    fetchArticleById(article_id).then((article: Article) => {
        res.status(200).send({article})
    })
}