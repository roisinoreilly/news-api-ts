import express, {Request, Response} from "express";
import { fetchAllTopics } from "../models/topics.models";
import { Topic } from "../types";

export const getAllTopics = (req: Request, res: Response) => {
    fetchAllTopics().then((topics: Topic[]) => {
        res.status(200).send({topics})
    })
}