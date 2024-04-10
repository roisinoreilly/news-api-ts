import request from "supertest";
import { expect, assert } from "chai";
import * as testData from "../db/data/test-data/index";
import app from "../app";
import seed from "../db/seeds/seed";
import db from "../db/index";
import endpoints = require("../endpoints.json")

beforeEach(() => seed(testData));
after(() => db.end());

describe("GET /api", () => {
    it("200: responds with an array endpoints", () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then((res) => {
            const expectedLength = endpoints.length;
            expect(res.body.endpoints).to.have.lengthOf(expectedLength)
            res.body.endpoints.forEach((endpoint: {}) => {
                expect(endpoint).to.include.all.keys("route", "description");
            });
        })
    })
    })

describe("GET /api/topics", () => {
    it("200: responds with an array of topics", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then((res) => {
            expect(res.body.topics.length).to.be.gte(1)
            res.body.topics.forEach((topic: {}) => {
                expect(topic).to.include.all.keys("slug", "description");
            });
        })
    })
})

describe("GET /api/articles/:article_id", () => {
    it("200: responds with an article", () => {
        return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then((res) => {
            expect(res.body.article[0]).to.include.all.keys("article_id", "title", "body", "votes", "topic", "author", "created_at", "comment_count");
        })
    })
})