const express = require("express");
const orderRouter = express.Router();

import {
  obtenerOrdenes,
  obtenerOrdenId,
} from "../controllers/order.controller";

orderRouter.get("/", obtenerOrdenes);
orderRouter.get("/:id", obtenerOrdenId);
/*orderRouter.get("/editar/:userId/:ordenId", editarOrden);
orderRouter.get("/eliminar/:userId/:ordenId", eliminarOrden);
orderRouter.post("/", agregarOrden);*/

export default orderRouter;
