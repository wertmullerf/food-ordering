import mongoose, { Schema } from "mongoose";
import { IDireccion } from "../interfaces/IDireccion";

// Esquema de la dirección
const direccionSchema: Schema = new Schema<IDireccion>(
  {
    calle: { type: String, required: true },
    altura: { type: Number, required: true },
    numero: { type: Number, required: true },
    piso: { type: Number },
  },
  {
    strict: true,
  }
);

// Modelo de la dirección
const Direccion = mongoose.model<IDireccion>("Direccion", direccionSchema);
export default Direccion;
