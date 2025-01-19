import { Document } from "mongoose";
import { IProducto } from "./IProducto";

export interface IProductoPedido extends Document {
  producto_id: IProducto["_id"];
  cantidad: number;
  precio: number;
}
