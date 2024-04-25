"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const users_models_1 = require("../models/users.models");
const getAllUsers = (req, res, next) => {
    (0, users_models_1.fetchAllUsers)()
        .then((users) => {
        res.status(200).send({ users });
    })
        .catch(next);
};
exports.getAllUsers = getAllUsers;
