import { Request, Response } from "express";
import AudioModel from "../models/audio-model";
export default class AudioContoller {
  listAllAudios = async (req: Request, res: Response) => {
    const audioModel = new AudioModel();
    const audioButtonList = await audioModel.listAll();

    res.status(200).json({ audioButtonList });
  };
}
