const express = require("express");
const orderRouter = express.Router();

import {
  obtenerOrdenes,
  obtenerOrdenId,
  editarOrden,
  eliminarOrden,
} from "../controllers/order.controller";

orderRouter.get("/", obtenerOrdenes);
orderRouter.get("/:id", obtenerOrdenId);
orderRouter.patch("/id", editarOrden);
orderRouter.delete("/id", eliminarOrden);

export default orderRouter;
