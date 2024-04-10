"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const testData = __importStar(require("../db/data/test-data/index"));
const app_1 = __importDefault(require("../app"));
const seed_1 = __importDefault(require("../db/seeds/seed"));
const index_1 = __importDefault(require("../db/index"));
const endpoints = require("../endpoints.json");
beforeEach(() => (0, seed_1.default)(testData));
after(() => index_1.default.end());
describe("GET /api", () => {
    it("200: responds with an array endpoints", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api")
            .expect(200)
            .then((res) => {
            const expectedLength = endpoints.length;
            (0, chai_1.expect)(res.body.endpoints).to.have.lengthOf(expectedLength);
            res.body.endpoints.forEach((endpoint) => {
                (0, chai_1.expect)(endpoint).to.include.all.keys("route", "description");
            });
        });
    });
});
describe("GET /api/topics", () => {
    it("200: responds with an array of topics", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/topics")
            .expect(200)
            .then((res) => {
            (0, chai_1.expect)(res.body.topics.length).to.be.gte(1);
            res.body.topics.forEach((topic) => {
                (0, chai_1.expect)(topic).to.include.all.keys("slug", "description");
            });
        });
    });
});
describe("GET /api/articles/:article_id", () => {
    it("200: responds with an article", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles/1")
            .expect(200)
            .then((res) => {
            (0, chai_1.expect)(res.body.article[0]).to.include.all.keys("article_id", "title", "body", "votes", "topic", "author", "created_at", "comment_count");
        });
    });
});
