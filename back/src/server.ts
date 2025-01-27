import express from "express";
import "dotenv/config";
import morgan from "morgan";

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
import { createClient } from "redis";

const app = express();
connectDB();

// Connecting to redis
export const client = createClient({
  url: "redis://127.0.0.1:6379",
});
app.use(morgan("dev"));
const server = http.createServer(app);
const io = new Server(server);

initializeSockets(io);

const PORT = process.env.PORT;
app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.get("/", (req, res) => {
  res.send("¡Servidor corriendo con TypeScript!");
});

app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/product", productRouter);
const main = async () => {
  await client.connect();
  app.listen(PORT);
  console.log(`Server listen on port ${PORT}`);
};

main();
