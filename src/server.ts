import express, { Request, Response, Router } from "express";
import mongoose from "mongoose";
import { audioRouter } from "./routes/audio-routes";
import { schedule } from "node-cron";
import AudioModel from "./models/audio-model";
const audioModel = new AudioModel();
require("dotenv").config({ path: __dirname + "/.env" });
const app = express();
const route = Router();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_CONNECT ?? "";

app.use(express.json());
route.get("/", (req: Request, res: Response) => {
  res.json({ message: "OK" });
});

app.use("/audio", audioRouter);
app.use(route);

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Conectou ao banco");
    app.listen(PORT, () => "server running on port 3333");
  })
  .catch((error) => {
    console.log(error);
  });

schedule("*/3 * * * *", async () => {
  await audioModel.updateDatabase();
});
