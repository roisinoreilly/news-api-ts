import request from "supertest";
import { expect, assert } from "chai";
import * as testData from "../db/data/test-data/index";
import app from "../app";
import seed from "../db/seeds/seed";
import db from "../db/index";

beforeEach(() => seed(testData));
after(() => db.end());

describe("GET /api/reviews", () => {
    it("200: responds with an array of review objects", () => {
        // return request(app)
        //     .get("/api/reviews")
        //     .expect(200)
        //     .then(({ body }) => {
        //     })
        })
    })