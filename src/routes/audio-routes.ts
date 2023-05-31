import express = require("express");
export const audioRouter = express.Router();

//controllers
import AudioContoller from "../controller/audio-controller";
const audioController = new AudioContoller();
//Routes
audioRouter.get("/", audioController.listAllAudios);
audioRouter.delete("/", audioController.deleteAudio);
audioRouter.put("/", audioController.forceUpdateDatabases);
