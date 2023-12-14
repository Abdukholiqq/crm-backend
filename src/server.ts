import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import fileUpload from "express-fileupload";
import router from "./routes/index.router";
import { resolve } from "path";
const PORT = process.env.SERVER_PORT || 5700;
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(resolve('src', 'uploads')))
app.use(fileUpload({ limits: { fieldSize: 5 * 1024 * 1024 } }));
app.use("/api", router);

app.listen(PORT, () =>
  console.log("server running", `http://localhost:${PORT}`)
);
