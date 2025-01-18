import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db";

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("¡Servidor corriendo con TypeScript!");
});
connectDB();
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
