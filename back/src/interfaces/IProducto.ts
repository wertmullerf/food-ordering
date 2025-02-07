import { Document } from "mongoose";
import { Categorias } from "../enums/categorias";
import { IIngrediente } from "./IIngrediente";

export interface IProducto extends Document {
  nombre: string;
  precio: number;
  stock: boolean;
  costo?: number;
  imageUrl: string;
  descripcion: string;
  categoria: Categorias;
  ingredientes: [{ id: IIngrediente["_id"]; cantidad: number }];
}
