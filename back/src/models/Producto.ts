import mongoose, { Schema } from "mongoose";
import { IProducto } from "../interfaces/IProducto";

// Esquema del producto
const productoSchema: Schema = new Schema<IProducto>(
  {
    nombre: { type: String, required: true, unique: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    costo: { type: Number, required: true },
    imageUrl: { type: String, required: true },
  },
  {
    strict: true,
  }
);

// Modelo del producto
const Producto = mongoose.model<IProducto>("Producto", productoSchema);
export default Producto;
