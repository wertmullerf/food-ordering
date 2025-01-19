import { Document } from "mongoose";
import { IUsuario } from "./IUser";

export interface IDireccion extends Document {
  usuario_id: IUsuario["_id"];
  calle: string;
  altura: number;
  numero: number;
  piso?: number;
}
