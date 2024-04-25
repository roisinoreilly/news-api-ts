"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicsArraySchema = exports.TopicSchema = void 0;
const zod_1 = require("zod");
exports.TopicSchema = zod_1.z.object({
    slug: zod_1.z.string(),
    description: zod_1.z.string(),
});
exports.TopicsArraySchema = zod_1.z.array(exports.TopicSchema);
