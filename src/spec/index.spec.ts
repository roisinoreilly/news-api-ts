import request from "supertest";
import { expect, assert } from "chai";
import * as testData from "../db/data/test-data/index";
import app from "../app";
import seed from "../db/seeds/seed";
import db from "../db/index";
import endpoints = require("../endpoints.json")

beforeEach(() => seed(testData));
after(() => db.end());

describe("GET /", () => {
    it("200: responds with an array endpoints", () => {
        return request(app)
        .get("/")
        .expect(200)
        .then((res) => {
            console.log(endpoints)
            const expectedLength = endpoints.length;
            expect(res.body.endpoints).to.have.lengthOf(expectedLength)
            res.body.endpoints.forEach(endpoint => {
                expect(endpoint).to.include.all.keys("route", "description");
            });
        })
    })
    })