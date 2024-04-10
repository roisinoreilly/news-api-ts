import express, { Express, Request, Response } from "express";
import apiRouter from "./routers/api.router";
import {
  handleCustomErrors,
  handlePSQLErrors,
  handleRouteErrors,
  handleServerErrors,
} from "./middlewares/errors";
const app: Express = express();

app.use(express.json());
app.use("/api", apiRouter);

app.all("*", handleRouteErrors);
app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleServerErrors);

export default app;
