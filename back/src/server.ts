import express from "express";
import "dotenv/config";

import { connectDB } from "./config/db";

import bodyParser from "body-parser";
import userRouter from "./routes/user.routes";
import orderRouter from "./routes/order.routes";
import productRouter from "./routes/product.routes";
import http from "http";
import { initializeSockets } from "./sockets/index";
import { Server } from "socket.io";
import paymentRouter from "./routes/payment.routes";
import "../src/services/cron/limpiarPedidosPendientes";
const app = express();
connectDB();

const server = http.createServer(app);
const io = new Server(server);

initializeSockets(io);

const PORT = process.env.PORT;
app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.get("/", (req, res) => {
  res.send("¡Servidor corriendo con TypeScript!");
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/product", productRouter);
