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
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("firebase/storage");
const firebaseConfig_1 = require("../firebaseConfig");
const audio_schemas_1 = require("../schemas/audio-schemas");
class AudioModel {
    constructor() {
        this.listAllFromFirebase = () => __awaiter(this, void 0, void 0, function* () {
            const buttonList = [];
            const audioFolder = (0, storage_1.ref)(firebaseConfig_1.storage, "audios");
            const imageFolder = (0, storage_1.ref)(firebaseConfig_1.storage, "images");
            const audioList = yield (0, storage_1.listAll)(audioFolder);
            const imageList = yield (0, storage_1.listAll)(imageFolder);
            for (let i = 0; i < audioList.items.length; i++) {
                const itemName = audioList.items[i].name.split(".")[0];
                const matchingImage = imageList.items.find((image) => image.name.split(".")[0] === itemName);
                const audioUrl = yield (0, storage_1.getDownloadURL)(audioList.items[i]);
                const imageUrl = matchingImage
                    ? yield (0, storage_1.getDownloadURL)(matchingImage)
                    : "https://pbs.twimg.com/media/E54Tg1eWUAMBVvx?format=png&name=360x360";
                buttonList.push({
                    name: itemName,
                    audioUrl: audioUrl,
                    imageUrl: imageUrl,
                });
            }
            return buttonList;
        });
        this.updateDatabase = () => __awaiter(this, void 0, void 0, function* () {
            console.log("executando atualização");
            const fireBaseAudios = yield this.listAllFromFirebase();
            const dataBaseAudios = yield this.listAllFromDataBase();
            const newAudios = fireBaseAudios.filter((item) => dataBaseAudios.find((obj) => obj.name === item.name) === undefined);
            const removeAudios = dataBaseAudios.filter((item) => fireBaseAudios.find((element) => element.name === item.name) ===
                undefined);
            if (newAudios.length)
                yield audio_schemas_1.AudioSchema.insertMany(newAudios);
            if (removeAudios.length)
                for (let i = 0; i < removeAudios.length; i++)
                    yield audio_schemas_1.AudioSchema.deleteOne({ name: removeAudios[i].name });
        });
        this.listAllFromDataBase = () => __awaiter(this, void 0, void 0, function* () {
            const databaseList = yield audio_schemas_1.AudioSchema.find();
            const list = [];
            databaseList.forEach((item) => {
                return list.push({
                    audioUrl: item.audioUrl,
                    imageUrl: item.imageUrl,
                    name: item.name,
                });
            });
            return list;
        });
        this.deleteOneAudio = (audioName) => __awaiter(this, void 0, void 0, function* () {
            const errors = {
                audio: false,
                audioNotFoundDataBase: false,
                image: false,
            };
            const audioFolder = (0, storage_1.ref)(firebaseConfig_1.storage, "audios");
            const imageFolder = (0, storage_1.ref)(firebaseConfig_1.storage, "images");
            const audioList = yield (0, storage_1.listAll)(audioFolder);
            const imageList = yield (0, storage_1.listAll)(imageFolder);
            const audio = audioList.items.find((item) => item.name.split(".")[0] === audioName);
            const image = imageList.items.find((item) => item.name.split(".")[0] === audioName);
            if (audio && image) {
                yield (0, storage_1.deleteObject)(audio)
                    .then(() => __awaiter(this, void 0, void 0, function* () {
                    yield (0, storage_1.deleteObject)(image)
                        .then(() => __awaiter(this, void 0, void 0, function* () { }))
                        .catch((reason) => {
                        console.log(reason);
                        errors.image = true;
                    });
                }))
                    .catch((reason) => {
                    console.log(reason);
                    errors.audio = true;
                });
            }
            if (!errors.audio && !errors.image)
                yield audio_schemas_1.AudioSchema.deleteOne({
                    name: audioName,
                })
                    .then((DeleteResult) => {
                    if (DeleteResult.deletedCount <= 0)
                        errors.audioNotFoundDataBase = true;
                })
                    .catch((reason) => {
                    console.log(reason);
                });
            return errors;
        });
    }
}
exports.default = AudioModel;
