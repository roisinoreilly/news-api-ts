import {Request, Response} from "express";
import endpoints = require("../endpoints.json")

export const getEndpoints = (req: Request, res: Response) => {
    res.status(200).send({endpoints})
}