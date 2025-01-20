import express from "express";
const productRouter = express.Router();

import {
  obtenerProductos,
  obtenerProductoId,
  editarProducto,
  eliminarProducto,
  agregarProducto,
} from "../controllers/product.controller";

productRouter.get("/", obtenerProductos);
productRouter.get("/:id", obtenerProductoId);
productRouter.patch("/:id", editarProducto);
productRouter.delete("/:id", eliminarProducto);
productRouter.post("/", agregarProducto);

export default productRouter;
