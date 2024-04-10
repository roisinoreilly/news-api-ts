import request from "supertest";
import { expect, assert } from "chai";
const chai = require("chai");
chai.use(require("chai-sorted"));
import * as testData from "../db/data/test-data/index";
import app from "../app";
import seed from "../db/seeds/seed";
import db from "../db/index";
import endpoints = require("../endpoints.json");
import { it } from "mocha";
import { Article, Topic } from "../types";

beforeEach(() => seed(testData));
after(() => db.end());

describe("GET /api", () => {
  it("200: responds with an array endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        const expectedLength = endpoints.length;
        expect(res.body.endpoints).to.have.lengthOf(expectedLength);
        res.body.endpoints.forEach((endpoint: {}) => {
          expect(endpoint).to.include.all.keys("route", "description");
        });
      });
  });
});

describe("GET /api/topics", () => {
  it("200: responds with an array of topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        expect(res.body.topics.length).to.be.gte(1);
        res.body.topics.forEach((topic: Topic) => {
          expect(topic).to.include.all.keys("slug", "description");
        });
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  it("200: responds with an article", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((res) => {
        expect(res.body.article[0]).to.include.all.keys(
          "article_id",
          "title",
          "body",
          "votes",
          "topic",
          "author",
          "created_at",
          "comment_count"
        );
      });
  });
  it("404: responds with an error message when article_id is not found", () => {
    return request(app)
      .get("/api/articles/10000")
      .expect(404)
      .then((res) => {
        expect(res.text).to.equal("Not found");
      });
  });
  it("400: responds with an error message when article_id is invalid", () => {
    return request(app)
      .get("/api/articles/not-an-id")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal("Bad request");
      });
  });
});

describe("GET /api/articles", () => {
  it("200: responds with an array of articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        expect(res.body.articles.length).to.be.gte(1);
        res.body.articles.forEach((article: Article) => {
          expect(article).to.include.all.keys(
            "article_id",
            "title",
            "body",
            "votes",
            "topic",
            "author",
            "created_at",
            "comment_count"
          );
        });
      });
  });
  it("200: articles array is sorted by default date descending", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).to.be.sortedBy("created_at", {
          descending: true,
        });
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  it("200: responds with an array of comments for the given article", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((res) => {
        expect(res.body.comments.length).to.be.gte(1);
        res.body.comments.forEach((comment: Comment) => {
          expect(comment).to.include.all.keys(
            "comment_id",
            "votes",
            "created_at",
            "author",
            "body"
          );
        });
      });
  });
  it("200: responds with an empty comments array for a valid article with no comments", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then((res) => {
        expect(res.body.comments).to.eql([]);
      });
  });
  it("404: article id not found", () => {
    return request(app)
      .get("/api/articles/10000/comments")
      .expect(404)
      .then((res) => {
        expect(res.text).to.equal("Not found");
      });
  });
  it("400: invalid article id", () => {
    return request(app)
      .get("/api/articles/not-an-id/comments")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal("Bad request");
      });
  });
});
