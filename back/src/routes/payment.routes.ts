import express from "express";
import {
  crearOrden,
  exitoso,
  fallido,
  pendiente,
} from "../controllers/payment.controller";
const paymentRouter = express.Router();

paymentRouter.post("/create", crearOrden);
paymentRouter.get("/success", exitoso);
paymentRouter.get("/failure", fallido);
paymentRouter.get("/pending", pendiente);

export default paymentRouter;
