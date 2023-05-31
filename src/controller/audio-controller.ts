import { Request, Response } from "express";
import AudioModel from "../models/audio-model";
export default class AudioContoller {
  listAllAudios = async (req: Request, res: Response) => {
    const audioModel = new AudioModel();
    await audioModel.updateDatabase();
    const audioButtonList = await audioModel.listAllFromDataBase();
    res.status(200).json({ buttons: audioButtonList });
  };
}
