"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.audioRouter = void 0;
const express = require("express");
exports.audioRouter = express.Router();
//controllers
const audio_controller_1 = __importDefault(require("../controller/audio-controller"));
const audioController = new audio_controller_1.default();
//Routes
exports.audioRouter.get("/", audioController.listAllAudios);
exports.audioRouter.delete("/", audioController.deleteAudio);
exports.audioRouter.put("/", audioController.forceUpdateDatabases);
