import { Schema, model } from "mongoose";
import { AudioDTO } from "../DTO/audio-dto";

const audioSchema = new Schema<AudioDTO>({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  audioUrl: { type: String, required: true },
  tags: { type: String },
});

export const AudioSchema = model<AudioDTO>("Audios", audioSchema);
