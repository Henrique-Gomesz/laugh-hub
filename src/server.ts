import express from "express";
import { Router, Request, Response } from "express";
import { audioRouter } from "./routes/audio-routes";
const app = express();
const route = Router();

app.use(express.json());
route.get("/", (req: Request, res: Response) => {
  res.json({ message: "OK" });
});
app.use("/audio", audioRouter);
app.use(route);
app.listen(3333, () => "server running on port 3333");
