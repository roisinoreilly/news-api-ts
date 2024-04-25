"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllUsers = void 0;
const index_1 = __importDefault(require("../db/index"));
const users_schemas_1 = require("../schemas/users.schemas");
const fetchAllUsers = () => {
    return index_1.default.query("SELECT * FROM users;").then(({ rows }) => {
        if (!rows || rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Not found" });
        }
        const validation = users_schemas_1.UsersSchema.safeParse(rows);
        if (!validation.success) {
            throw new Error("Validation failed");
        }
        if (validation.success) {
            return rows;
        }
    });
};
exports.fetchAllUsers = fetchAllUsers;
