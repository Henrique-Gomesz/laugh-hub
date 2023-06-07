"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const audio_model_1 = __importDefault(require("../models/audio-model"));
class AudioContoller {
    constructor() {
        this.listAllAudios = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const audioModel = new audio_model_1.default();
            yield audioModel.updateDatabase();
            const audioButtonList = yield audioModel.listAllFromDataBase();
            res.status(200).json({ buttons: audioButtonList });
        });
        this.deleteAudio = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const audioModel = new audio_model_1.default();
            const audioName = req.query.name;
            if (!audioName || !audioName.length)
                return res
                    .status(400)
                    .json({ message: "You must send a audio name as param" });
            const status = yield audioModel.deleteOneAudio(audioName);
            if (!status.audio && !status.audioNotFoundDataBase && !status.image)
                return res.status(204);
            else {
                if (status.audio)
                    return res.status(500).json({
                        error: "A error occurred when trying to delete the audio from firebase",
                    });
                if (status.image)
                    res.status(500).json({
                        error: "A error occurred when trying to delete the image from firebase",
                    });
                if (status.audioNotFoundDataBase)
                    return res.status(500).json({
                        error: "A error occurred when trying to delete the audio from database",
                    });
            }
        });
        this.forceUpdateDatabases = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const audioModel = new audio_model_1.default();
            yield audioModel.updateDatabase();
            res.status(200).json({ message: "Database was updated" });
        });
    }
}
exports.default = AudioContoller;
