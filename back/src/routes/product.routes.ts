import express from "express";
const productRouter = express.Router();

import {
  obtenerProductos,
  obtenerProductoId,
  editarProducto,
  eliminarProducto,
  agregarProducto,
} from "../controllers/productController";

productRouter.post("/", obtenerProductos);
productRouter.get("/:id", obtenerProductoId);
productRouter.get("/editar/:productId", editarProducto);
productRouter.get("/eliminar/:productId", eliminarProducto);
//productRouter.post("/", agregarProducto);

export default productRouter;
