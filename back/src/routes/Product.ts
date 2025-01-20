import express from "express";
const router = express.Router();

import {
  obtenerProductos,
  obtenerProductoId,
  editarProducto,
  eliminarProducto,
  agregarProducto,
} from "../controllers/productController";

router.post("/", obtenerProductos);
router.get("/:id", obtenerProductoId);
router.get("/editar/:productId", editarProducto);
router.get("/eliminar/:productId", eliminarProducto);
router.post("/", agregarProducto);

module.exports = router;
