import mongoose, { Schema, Document } from "mongoose";
import { IUsuario } from "./Usuario";

// Interfaz de la dirección
export interface IDireccion extends Document {
  usuario_id: IUsuario["_id"];
  calle: string;
  altura: number;
  numero: number;
  piso?: number;
}

// Esquema de la dirección
const direccionSchema: Schema = new Schema<IDireccion>({
  usuario_id: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  calle: { type: String, required: true },
  altura: { type: Number, required: true },
  numero: { type: Number, required: true },
  piso: { type: Number },
});

// Modelo de la dirección
const Direccion = mongoose.model<IDireccion>("Direccion", direccionSchema);
export default Direccion;
