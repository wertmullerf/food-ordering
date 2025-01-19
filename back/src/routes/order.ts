const express = require("express");
const router = express.Router();
const {
  obtenerOrdenes,
  obtenerOrdenesId,
  editarOrden,
  eliminarOrden,
  agregarOrden,
  //funciones de db
} = require("../controller/orderController");

router.post("/", obtenerOrdenes);
router.get("/:id", obtenerOrdenesId);
router.get("/editar/:userId/:ordenId", editarOrden);
router.get("/eliminar/:userId/:ordenId", eliminarOrden);
router.post("/", agregarOrden);

module.exports = router;
