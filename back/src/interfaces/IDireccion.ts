import { Document } from "mongoose";

export interface IDireccion extends Document {
  calle: string;
  altura: number;
  numero: number;
  piso?: number;
}
