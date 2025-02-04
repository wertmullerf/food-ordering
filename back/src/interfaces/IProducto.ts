import { Document } from "mongoose";
import { Categorias } from "../enums/Categorias";
import { IIngrediente } from "./IIngrediente";

export interface IProducto extends Document {
    nombre: string;
    precio: number;
    stock: number;
    costo?: number;
    imageUrl: string;
    descripcion: string;
    categoria: Categorias;
    ingredientes: IIngrediente["_id"][];
}
