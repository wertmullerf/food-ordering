import mongoose, { Schema } from "mongoose";
import { IProducto } from "../interfaces/IProducto";
import { Categorias } from "../enums/categorias";

// Esquema del producto
const productoSchema: Schema = new Schema<IProducto>(
  {
    nombre: { type: String, required: true, unique: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    costo: { type: Number, required: false },
    imageUrl: { type: String, required: true },
    descripcion: { type: String, required: true },
    categoria: {
      type: String,
      enum: Object.values(Categorias), // Asegúrate de que enum es un array de strings
      required: true,
    },
    ingredientes: [{ type: Schema.Types.ObjectId, ref: "Ingrediente" }],
  },
  {
    strict: true,
  }
);

// Modelo del producto
const Producto = mongoose.model<IProducto>("Producto", productoSchema);
export default Producto;
