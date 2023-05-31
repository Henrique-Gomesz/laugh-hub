import { Request, Response, response } from "express";
import AudioModel from "../models/audio-model";
export default class AudioContoller {
  listAllAudios = async (req: Request, res: Response) => {
    const audioModel = new AudioModel();
    await audioModel.updateDatabase();
    const audioButtonList = await audioModel.listAllFromDataBase();
    res.status(200).json({ buttons: audioButtonList });
  };

  deleteAudio = async (req: Request, res: Response) => {
    const audioModel = new AudioModel();

    const audioName = req.query.name as string;
    if (!audioName || !audioName.length)
      return res
        .status(400)
        .json({ message: "You must send a audio name as param" });
    const status = await audioModel.deleteOneAudio(audioName);
    if (!status.audio && !status.audioNotFoundDataBase && !status.image)
      return res.status(204);
    else {
      if (status.audio)
        return res.status(500).json({
          error:
            "A error occurred when trying to delete the audio from firebase",
        });
      if (status.image)
        res.status(500).json({
          error:
            "A error occurred when trying to delete the image from firebase",
        });
      if (status.audioNotFoundDataBase)
        return res.status(500).json({
          error:
            "A error occurred when trying to delete the audio from database",
        });
    }
  };

  forceUpdateDatabases = async (req: Request, res: Response) => {
    const audioModel = new AudioModel();

    await audioModel.updateDatabase();

    res.status(200).json({ message: "Database was updated" });
  };
}
