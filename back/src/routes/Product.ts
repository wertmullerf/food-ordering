import express from "express";
const router = express.Router();

const {
  obtenerProductos,
  obtenerProductoId,
  editarProducto,
  eliminarProducto,
  agregarProducto,
} = require("../controller/productController");

router.post("/", obtenerProductos);
router.get("/:id", obtenerProductoId);
router.get("/editar/:productId", editarProducto);
router.get("/eliminar/:productId", eliminarProducto);
router.post("/", agregarProducto);

module.exports = router;
