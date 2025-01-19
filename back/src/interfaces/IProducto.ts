import { Document } from "mongoose";

export interface IProducto extends Document {
  nombre: string;
  precio: number;
  stock: number;
  costo?: number;
}
