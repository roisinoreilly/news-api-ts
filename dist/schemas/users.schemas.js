"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersSchema = exports.UserSchema = void 0;
const zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    username: zod_1.z.string(),
    avatar_url: zod_1.z.string()
});
exports.UsersSchema = zod_1.z.array(exports.UserSchema);
