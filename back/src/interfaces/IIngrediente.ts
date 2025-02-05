import { Document } from "mongoose";

export interface IIngrediente extends Document {
  nombre: string;
  precioExtra: number; // Precio adicional si aplica
  removible: boolean;
}
