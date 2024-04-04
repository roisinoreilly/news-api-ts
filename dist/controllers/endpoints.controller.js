"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndpoints = void 0;
const endpoints = require("../endpoints.json");
const getEndpoints = (req, res) => {
    res.status(200).send({ endpoints });
};
exports.getEndpoints = getEndpoints;
