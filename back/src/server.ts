import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db";
import bodyParser from "body-parser";

const app = express();
connectDB();

const PORT = process.env.PORT;
app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req, res) => {
  res.send("¡Servidor corriendo con TypeScript!");
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//
