import { Document } from "mongoose";
import { IProducto } from "./IProducto";

export interface IPedidoProducto extends Document {
  producto_id: IProducto["_id"];
  nombre: String;
  cantidad: number;
  precio_unitario: number;
}
