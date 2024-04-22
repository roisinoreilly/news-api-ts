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
  it("404: responds with an error message if given an invalid route", () => {
    return request(app)
      .get("/invalid-route")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).to.equal("Not found");
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
        expect(res.body.msg).to.equal("Not found");
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
        expect(res.body.msg).to.equal("Not found");
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

describe("POST /api/articles/:article_id/comments", () => {
  it("201: responds with a posted comment for a valid article", () => {
    const testComment = {
      username: "butter_bridge",
      body: "test comment body",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(testComment)
      .expect(201)
      .then((res) => {
        expect(res.body.comment).to.include.all.keys(
          "article_id",
          "author",
          "body",
          "comment_id",
          "created_at",
          "votes"
        );
        expect(res.body.comment.article_id).to.eql(1);
        expect(res.body.comment.author).to.eql(testComment.username);
        expect(res.body.comment.body).to.eql(testComment.body);
      });
  });
  it("200: ignores any unnecessary properties on the comment body", () => {
    const testComment = {
      username: "butter_bridge",
      body: "test comment body",
      extraProperty: "extra property",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(testComment)
      .expect(201)
      .then((res) => {
        expect(res.body.comment).to.not.have.property("extraProperty");
      })
  })
  it("404: responds with an appropriate message when given a valid but non-existent id", () => {
    const testComment = {
      username: "butter_bridge",
      body: "test comment body",
    };
    return request(app)
      .post("/api/articles/999999/comments")
      .send(testComment)
      .expect(404)
      .then((res) => {
        expect(res.body.msg).to.equal("Not found");
      });
  });
  it("400: responds with an appropriate message when given an invalid id", () => {
    const testComment = {
      username: "butter_bridge",
      body: "test comment body",
    };
    return request(app)
      .post("/api/articles/not-an-id/comments")
      .send(testComment)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal("Bad request");
      });
  });
  it("400: responds with an error message when given an empty request body", () => {
    const testComment = { username: "butter_bridge"};
    return request(app)
      .post("/api/articles/1/comments")
      .send(testComment)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal("Bad request");
      });
  });
  it("404: responds with an error message when username is not in the database", () => {
    const testComment = { username: "not-in-db", body: "test comment"};
    return request(app)
      .post("/api/articles/1/comments")
      .send(testComment)
      .expect(404)
      .then((res) => {
        expect(res.body.msg).to.equal("Not found");
      });
  });
});

describe('PATCH /api/articles/:article_id', () => {
  it("200: responds with the patched article", () => {
    const testVote = {
      inc_votes: 1
    }
    return request(app)
      .patch("/api/articles/1")
      .send(testVote)
      .expect(200)
      .then((res) => {
        expect(res.body.article).to.include.all.keys(
          "article_id",
          "title",
          "body",
          "votes",
          "topic",
          "author",
          "created_at",
        );
        expect(res.body.article.votes).to.eql(101);
      });
  })
  it("404: responds with an appropriate message when given a valid but non-existent id", () => {
    const testVote = {
      inc_votes: 1
    }
    return request(app)
      .patch("/api/articles/999999")
      .send(testVote)
      .expect(404)
      .then((res) => {
        expect(res.body.msg).to.equal("Not found");
      });
  })
  it("400: responds with an appropriate message when given an invalid id", () => {
    const testVote = {
      inc_votes: 1
    }
    return request(app)
      .patch("/api/articles/not-an-id")
      .send(testVote)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal("Bad request");
      });
  })
  it("400: responds with an error message when inc_votes is not a number", () => {
    const testVote = { inc_votes: "not-a-number"};
    return request(app)
      .patch("/api/articles/1")
      .send(testVote)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal("Bad request");
      });
  })
});

describe('DELETE /api/comments/:comment_id', () => {
  it("204: responds with no content", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(204)
  })
  it("404: responds with an appropriate message when given a valid but non-existent id", () => {
    return request(app)
      .delete("/api/comments/999999")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).to.equal("Not found");
        })
      })
  })
  it("400: responds with an appropriate message when given an invalid id", () => {
    return request(app)
      .delete("/api/comments/not-an-id")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal("Bad request");
      })
  })

  