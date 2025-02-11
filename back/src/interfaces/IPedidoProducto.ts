import { Document } from "mongoose";
import { IProducto } from "./IProducto";
import { IIngrediente } from "./IIngrediente";

export interface IPedidoProducto extends Document {
  producto_id: IProducto["_id"];
  nombre: String;
  precio: number;
  cantidad: number;
  personalizaciones: {
    extras: [
      {
        id: IIngrediente["_id"];
        cantidad: number;
      }
    ];
    removidos: IIngrediente["_id"][];
  };
}
