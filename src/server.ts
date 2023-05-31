import express, { Request, Response, Router } from "express";
import { connect } from "mongoose";
import { audioRouter } from "./routes/audio-routes";
require("dotenv").config({ path: __dirname + "/.env" });
const app = express();
const route = Router();
const port = process.env.PORT;
const DB_URL = process.env.DB_CONNECT ?? "";
app.use(express.json());
route.get("/", (req: Request, res: Response) => {
  res.json({ message: "OK" });
});
app.use("/audio", audioRouter);
app.use(route);

connect(DB_URL)
  .then(() => {
    console.log("Conectou ao banco");
    app.listen(port, () => "server running on port 3333");
  })
  .catch((error) => {
    console.log(error);
  });
