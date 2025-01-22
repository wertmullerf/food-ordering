import express from "express";
import { crearOrden } from "../controllers/payment.controller";
import { exitoso, fallido, pendiente } from "../helpers/paymentfunctions";
const paymentRouter = express.Router();

paymentRouter.post("/create", crearOrden);
paymentRouter.get("/success", exitoso);
paymentRouter.get("/failure", fallido);
paymentRouter.get("/pending", pendiente);

export default paymentRouter;
