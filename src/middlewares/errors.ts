import { Request, Response, NextFunction} from "express"
import { ResponseError } from "../types";

export const handleRouteErrors = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("Route not found");
}

export const handleCustomErrors = (err: ResponseError, req: Request, res: Response, next: NextFunction) => {
    if (err.status === 404) {
        res.status(404).send("Not found");
    }
    else next(err);
}

export const handlePSQLErrors = (err: ResponseError, req: Request, res: Response, next: NextFunction) => {
    if (err.code == "22P02") {
        res.status(400).send({ msg: "Bad request" });
    } else {
        next(err);
    }
}

export const handleServerErrors = (err: ResponseError, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(500).send("Internal Server Error");
}