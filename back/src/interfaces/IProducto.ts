import { Document } from "mongoose";
import { Categorias } from "../enums/categorias";

export interface IProducto extends Document {
    nombre: string;
    precio: number;
    stock: number;
    costo?: number;
    imageUrl: string;
    descripcion: string;
    categoria: Categorias;
}
