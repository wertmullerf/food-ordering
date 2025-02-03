import { Document } from "mongoose";
import { IUsuario } from "./IUser";

export interface IDireccion extends Document {
  calle: string;
  altura: number;
  numero: number;
  piso?: number;
}
