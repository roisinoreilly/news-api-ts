"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_router_1 = __importDefault(require("./routers/api.router"));
const app = (0, express_1.default)();
app.use("/api", api_router_1.default);
exports.default = app;
