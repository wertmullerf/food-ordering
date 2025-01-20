const express = require("express");
const router = express.Router();

import { obtenerOrdenes, obtenerOrdenId } from "../controllers/orderController";

router.post("/", obtenerOrdenes);
router.get("/:id", obtenerOrdenId);
/*router.get("/editar/:userId/:ordenId", editarOrden);
router.get("/eliminar/:userId/:ordenId", eliminarOrden);
router.post("/", agregarOrden);*/

module.exports = router;
