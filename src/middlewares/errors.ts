import { Request, Response, NextFunction } from "express";
import { ResponseError } from "../types";

export const handleRouteErrors = (
  req: Request,
  res: Response,
) => {
  res.status(404).send({ msg: "Not found" });
};

export const handleCustomErrors = (
  err: ResponseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.status === 404) {
    res.status(404).send({ msg: "Not found" });
  } else if (err.status === 400) {
    res.status(400).send({ msg: "Bad request" });
  } else next(err);
};

export const handlePSQLErrors = (
  err: ResponseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "Not found" });
  } else {
    next(err);
  }
};

export const handleServerErrors = (
  err: ResponseError,
  req: Request,
  res: Response,
) => {
  console.log(err);
  res.status(500).send("Internal Server Error");
};
