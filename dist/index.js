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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const audio_routes_1 = require("./routes/audio-routes");
const node_cron_1 = require("node-cron");
const audio_model_1 = __importDefault(require("./models/audio-model"));
const audioModel = new audio_model_1.default();
require("dotenv").config({ path: __dirname + "/.env" });
const app = (0, express_1.default)();
const route = (0, express_1.Router)();
const PORT = process.env.PORT;
const DB_URL = (_a = process.env.DB_CONNECT) !== null && _a !== void 0 ? _a : "";
app.use(express_1.default.json());
route.get("/", (req, res) => {
    res.status(200).json({ message: "OK" });
});
app.use("/audio", audio_routes_1.audioRouter);
app.use(route);
mongoose_1.default
    .connect(DB_URL)
    .then(() => {
    console.log("Conectou ao banco");
    app.listen(PORT, () => "server running on port 3333");
    (0, node_cron_1.schedule)("*/5 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        yield audioModel.updateDatabase();
    }));
})
    .catch((error) => {
    console.log(error);
});
