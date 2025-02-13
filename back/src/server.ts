import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./config/db";

import bodyParser from "body-parser";
import ingredienteRouter from "./routes/ingrediente.routes";
import userRouter from "./routes/user.routes";
import orderRouter from "./routes/order.routes";
import productRouter from "./routes/product.routes";
import http from "http";
import { initializeSockets } from "./sockets/index";
import { Server } from "socket.io";
import paymentRouter from "./routes/payment.routes";
import authRouter from "./routes/auth.routes";
import "../src/services/cron/limpiarPedidosPendientes";
import { createClient } from "redis";
import path from "path";
import { CORS_ORIGINS } from "./config";
const PORT = process.env.PORT;
const app = express();
connectDB();
app.use(
  cors({
    origin: CORS_ORIGINS,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Accept"],
  })
);

// Connecting to redis
export const client = createClient({
  url: "redis://127.0.0.1:6379",
});
app.use(morgan("dev"));
const server = http.createServer(app);
const io = new Server(server);

initializeSockets(io);

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use((req, res, next) => {
  if (req.path.includes("/webhook")) {
    console.log("Webhook request received:", {
      path: req.path,
      method: req.method,
      headers: req.headers,
      body: req.body,
      query: req.query,
    });
  }
  next();
});

app.get("/", (req, res) => {
  res.send("¡Servidor corriendo con TypeScript!");
});

app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/product", productRouter);
app.use("/auth/login", authRouter);
app.use("/api/ingredient", ingredienteRouter);

const main = async () => {
  await client.connect();
  app.listen(PORT);
  console.log(`Server listen on port ${PORT}`);
};

main();
