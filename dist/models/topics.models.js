"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllTopics = void 0;
const index_1 = __importDefault(require("../db/index"));
const fetchAllTopics = () => {
    return index_1.default.query(`SELECT * FROM topics`).then(({ rows }) => {
        return rows;
    });
};
exports.fetchAllTopics = fetchAllTopics;
