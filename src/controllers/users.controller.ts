import { Request, Response, NextFunction } from "express";
import { User } from "../types";
import { fetchAllUsers } from "../models/users.models";

export const getAllUsers = (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  fetchAllUsers()
    .then((users: User[]) => {
      res.status(200).send({ users });
    })
    .catch(next);
};
