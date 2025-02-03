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

import { verifyToken } from "../middlewares/authMiddleware";

productRouter.get("/", obtenerProductos);
productRouter.get("/:id", obtenerProductoId);
productRouter.patch("/:id", verifyToken, editarProducto);
productRouter.delete("/:id", verifyToken, eliminarProducto);
productRouter.post("/", upload.single("image"), verifyToken, agregarProducto);

export default productRouter;
