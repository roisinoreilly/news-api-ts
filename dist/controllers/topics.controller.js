"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTopics = void 0;
const topics_models_1 = require("../models/topics.models");
const getAllTopics = (req, res) => {
    (0, topics_models_1.fetchAllTopics)().then((topics) => {
        res.status(200).send({ topics });
    });
};
exports.getAllTopics = getAllTopics;
