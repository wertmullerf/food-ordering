import express from "express";
import { crearOrden } from "../controllers/payment.controller";
import {
  exitoso,
  fallido,
  pendiente,
  webhook,
} from "../helpers/paymentfunctions";
const paymentRouter = express.Router();

paymentRouter.post("/create", crearOrden);
paymentRouter.post("/webhook", webhook);

export default paymentRouter;
