"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleServerErrors = exports.handlePSQLErrors = exports.handleCustomErrors = exports.handleRouteErrors = void 0;
const handleRouteErrors = (req, res, next) => {
    res.status(404).send({ msg: "Not found" });
};
exports.handleRouteErrors = handleRouteErrors;
const handleCustomErrors = (err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).send({ msg: "Not found" });
    }
    else if (err.status === 400) {
        res.status(400).send({ msg: "Bad request" });
    }
    else
        next(err);
};
exports.handleCustomErrors = handleCustomErrors;
const handlePSQLErrors = (err, req, res, next) => {
    if (err.code === "22P02") {
        res.status(400).send({ msg: "Bad request" });
    }
    else if (err.code === "23503") {
        res.status(404).send({ msg: "Not found" });
    }
    else {
        next(err);
    }
};
exports.handlePSQLErrors = handlePSQLErrors;
const handleServerErrors = (err, req, res, next) => {
    console.log(err);
    res.status(500).send("Internal Server Error");
};
exports.handleServerErrors = handleServerErrors;
