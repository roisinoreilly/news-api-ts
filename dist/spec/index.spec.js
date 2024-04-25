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
const chai = require("chai");
chai.use(require("chai-sorted"));
const testData = __importStar(require("../db/data/test-data/index"));
const app_1 = __importDefault(require("../app"));
const seed_1 = __importDefault(require("../db/seeds/seed"));
const index_1 = __importDefault(require("../db/index"));
const endpoints = require("../endpoints.json");
const mocha_1 = require("mocha");
beforeEach(() => (0, seed_1.default)(testData));
after(() => index_1.default.end());
describe("GET /api", () => {
    (0, mocha_1.it)("200: responds with an array endpoints", () => {
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
    (0, mocha_1.it)("404: responds with an error message if given an invalid route", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/invalid-route")
            .expect(404)
            .then((res) => {
            (0, chai_1.expect)(res.body.msg).to.equal("Not found");
        });
    });
});
describe("GET /api/topics", () => {
    (0, mocha_1.it)("200: responds with an array of topics", () => {
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
    (0, mocha_1.it)("200: responds with an article", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles/1")
            .expect(200)
            .then((res) => {
            (0, chai_1.expect)(res.body.article[0]).to.include.all.keys("article_id", "title", "body", "votes", "topic", "author", "created_at", "comment_count");
        });
    });
    (0, mocha_1.it)("404: responds with an error message when article_id is not found", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles/10000")
            .expect(404)
            .then((res) => {
            (0, chai_1.expect)(res.body.msg).to.equal("Not found");
        });
    });
    (0, mocha_1.it)("400: responds with an error message when article_id is invalid", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles/not-an-id")
            .expect(400)
            .then((res) => {
            (0, chai_1.expect)(res.body.msg).to.equal("Bad request");
        });
    });
});
describe("GET /api/articles", () => {
    (0, mocha_1.it)("200: responds with an array of articles", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles")
            .expect(200)
            .then((res) => {
            (0, chai_1.expect)(res.body.articles.length).to.be.gte(1);
            res.body.articles.forEach((article) => {
                (0, chai_1.expect)(article).to.include.all.keys("article_id", "title", "votes", "topic", "author", "created_at", "comment_count");
            });
        });
    });
    (0, mocha_1.it)("200: articles do not contain the key of body", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles")
            .expect(200)
            .then((res) => {
            (0, chai_1.expect)(res.body.articles.length).to.be.gte(1);
            res.body.articles.forEach((article) => {
                (0, chai_1.expect)(article).to.not.include.keys("body");
            });
        });
    });
    (0, mocha_1.it)("200: articles array is sorted by default date descending", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles")
            .expect(200)
            .then((res) => {
            (0, chai_1.expect)(res.body.articles).to.be.sortedBy("created_at", {
                descending: true,
            });
        });
    });
});
describe("GET /api/articles/:article_id/comments", () => {
    (0, mocha_1.it)("200: responds with an array of comments for the given article", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles/1/comments")
            .expect(200)
            .then((res) => {
            (0, chai_1.expect)(res.body.comments.length).to.be.gte(1);
            res.body.comments.forEach((comment) => {
                (0, chai_1.expect)(comment).to.include.all.keys("comment_id", "votes", "created_at", "author", "body");
            });
        });
    });
    (0, mocha_1.it)("200: responds with an empty comments array for a valid article with no comments", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles/2/comments")
            .expect(200)
            .then((res) => {
            (0, chai_1.expect)(res.body.comments).to.eql([]);
        });
    });
    (0, mocha_1.it)("404: article id not found", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles/10000/comments")
            .expect(404)
            .then((res) => {
            (0, chai_1.expect)(res.body.msg).to.equal("Not found");
        });
    });
    (0, mocha_1.it)("400: invalid article id", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles/not-an-id/comments")
            .expect(400)
            .then((res) => {
            (0, chai_1.expect)(res.body.msg).to.equal("Bad request");
        });
    });
});
describe("POST /api/articles/:article_id/comments", () => {
    (0, mocha_1.it)("201: responds with a posted comment for a valid article", () => {
        const testComment = {
            username: "butter_bridge",
            body: "test comment body",
        };
        return (0, supertest_1.default)(app_1.default)
            .post("/api/articles/1/comments")
            .send(testComment)
            .expect(201)
            .then((res) => {
            (0, chai_1.expect)(res.body.comment).to.include.all.keys("article_id", "author", "body", "comment_id", "created_at", "votes");
            (0, chai_1.expect)(res.body.comment.article_id).to.eql(1);
            (0, chai_1.expect)(res.body.comment.author).to.eql(testComment.username);
            (0, chai_1.expect)(res.body.comment.body).to.eql(testComment.body);
        });
    });
    (0, mocha_1.it)("200: ignores any unnecessary properties on the comment body", () => {
        const testComment = {
            username: "butter_bridge",
            body: "test comment body",
            extraProperty: "extra property",
        };
        return (0, supertest_1.default)(app_1.default)
            .post("/api/articles/1/comments")
            .send(testComment)
            .expect(201)
            .then((res) => {
            (0, chai_1.expect)(res.body.comment).to.not.have.property("extraProperty");
        });
    });
    (0, mocha_1.it)("404: responds with an appropriate message when given a valid but non-existent id", () => {
        const testComment = {
            username: "butter_bridge",
            body: "test comment body",
        };
        return (0, supertest_1.default)(app_1.default)
            .post("/api/articles/999999/comments")
            .send(testComment)
            .expect(404)
            .then((res) => {
            (0, chai_1.expect)(res.body.msg).to.equal("Not found");
        });
    });
    (0, mocha_1.it)("400: responds with an appropriate message when given an invalid id", () => {
        const testComment = {
            username: "butter_bridge",
            body: "test comment body",
        };
        return (0, supertest_1.default)(app_1.default)
            .post("/api/articles/not-an-id/comments")
            .send(testComment)
            .expect(400)
            .then((res) => {
            (0, chai_1.expect)(res.body.msg).to.equal("Bad request");
        });
    });
    (0, mocha_1.it)("400: responds with an error message when given an empty request body", () => {
        const testComment = { username: "butter_bridge" };
        return (0, supertest_1.default)(app_1.default)
            .post("/api/articles/1/comments")
            .send(testComment)
            .expect(400)
            .then((res) => {
            (0, chai_1.expect)(res.body.msg).to.equal("Bad request");
        });
    });
    (0, mocha_1.it)("404: responds with an error message when username is not in the database", () => {
        const testComment = { username: "not-in-db", body: "test comment" };
        return (0, supertest_1.default)(app_1.default)
            .post("/api/articles/1/comments")
            .send(testComment)
            .expect(404)
            .then((res) => {
            (0, chai_1.expect)(res.body.msg).to.equal("Not found");
        });
    });
});
describe("PATCH /api/articles/:article_id", () => {
    (0, mocha_1.it)("200: responds with the patched article", () => {
        const testVote = {
            inc_votes: 1,
        };
        return (0, supertest_1.default)(app_1.default)
            .patch("/api/articles/1")
            .send(testVote)
            .expect(200)
            .then((res) => {
            (0, chai_1.expect)(res.body.article).to.include.all.keys("article_id", "title", "body", "votes", "topic", "author", "created_at");
            (0, chai_1.expect)(res.body.article.votes).to.eql(101);
        });
    });
    (0, mocha_1.it)("404: responds with an appropriate message when given a valid but non-existent id", () => {
        const testVote = {
            inc_votes: 1,
        };
        return (0, supertest_1.default)(app_1.default)
            .patch("/api/articles/999999")
            .send(testVote)
            .expect(404)
            .then((res) => {
            (0, chai_1.expect)(res.body.msg).to.equal("Not found");
        });
    });
    (0, mocha_1.it)("400: responds with an appropriate message when given an invalid id", () => {
        const testVote = {
            inc_votes: 1,
        };
        return (0, supertest_1.default)(app_1.default)
            .patch("/api/articles/not-an-id")
            .send(testVote)
            .expect(400)
            .then((res) => {
            (0, chai_1.expect)(res.body.msg).to.equal("Bad request");
        });
    });
    (0, mocha_1.it)("400: responds with an error message when inc_votes is not a number", () => {
        const testVote = { inc_votes: "not-a-number" };
        return (0, supertest_1.default)(app_1.default)
            .patch("/api/articles/1")
            .send(testVote)
            .expect(400)
            .then((res) => {
            (0, chai_1.expect)(res.body.msg).to.equal("Bad request");
        });
    });
});
describe("DELETE /api/comments/:comment_id", () => {
    (0, mocha_1.it)("204: responds with no content", () => {
        return (0, supertest_1.default)(app_1.default).delete("/api/comments/1").expect(204);
    });
    (0, mocha_1.it)("404: responds with an appropriate message when given a valid but non-existent id", () => {
        return (0, supertest_1.default)(app_1.default)
            .delete("/api/comments/999999")
            .expect(404)
            .then((res) => {
            (0, chai_1.expect)(res.body.msg).to.equal("Not found");
        });
    });
});
(0, mocha_1.it)("400: responds with an appropriate message when given an invalid id", () => {
    return (0, supertest_1.default)(app_1.default)
        .delete("/api/comments/not-an-id")
        .expect(400)
        .then((res) => {
        (0, chai_1.expect)(res.body.msg).to.equal("Bad request");
    });
});
describe("GET /api/users", () => {
    (0, mocha_1.it)("200: responds with an array of users", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/users")
            .expect(200)
            .then((res) => {
            (0, chai_1.expect)(res.body.users.length).to.be.gte(1);
            res.body.users.forEach((user) => {
                (0, chai_1.expect)(user).to.include.all.keys("username", "name", "avatar_url");
            });
        });
    });
});
