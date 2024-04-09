import express, { Express, Request, Response } from "express";
import apiRouter from "./routers/api.router";
const app: Express = express();

app.use("/api", apiRouter)

export default app;