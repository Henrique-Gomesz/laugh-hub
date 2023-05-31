import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IAudio {
  name: string;
  imageUrl: string;
  audioUrl: string;
}

// 2. Create a Schema corresponding to the document interface.
const audioSchema = new Schema<IAudio>({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  audioUrl: { type: String, required: true },
});

// 3. Create a Model.
export const AudioModel = model<IAudio>("Audios", audioSchema);
