"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllTopics = void 0;
const index_1 = __importDefault(require("../db/index"));
const topics_schemas_1 = require("../schemas/topics.schemas");
const fetchAllTopics = () => {
    return index_1.default
        .query(`SELECT * FROM topics`)
        .then(({ rows }) => {
        if (!rows || rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Not found" });
        }
        const validation = topics_schemas_1.TopicsArraySchema.safeParse(rows);
        if (!validation.success) {
            throw new Error("Validation failed");
        }
        if (validation.success) {
            return rows;
        }
    });
};
exports.fetchAllTopics = fetchAllTopics;
