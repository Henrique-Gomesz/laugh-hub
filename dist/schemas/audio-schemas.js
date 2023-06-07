"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioSchema = void 0;
const mongoose_1 = require("mongoose");
const audioSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    audioUrl: { type: String, required: true },
    tags: { type: String },
});
exports.AudioSchema = (0, mongoose_1.model)("Audios", audioSchema);
