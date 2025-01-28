const express = require("express");
const orderRouter = express.Router();

import {
  obtenerOrdenes,
  obtenerOrdenId,
  editarOrden,
  eliminarOrden,
} from "../controllers/order.controller";

import { verifyToken } from "../middlewares/authMiddleware";

orderRouter.get("/", obtenerOrdenes);
orderRouter.get("/:id", obtenerOrdenId);
orderRouter.patch("/id", verifyToken, editarOrden);
orderRouter.delete("/id", verifyToken, eliminarOrden);

export default orderRouter;
