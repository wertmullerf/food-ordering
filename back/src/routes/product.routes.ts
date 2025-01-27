import express from "express";
const productRouter = express.Router();
import upload from "../config/multerConfig";
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
productRouter.post("/", upload.single("image"), agregarProducto);

export default productRouter;
