import mongoose, { Schema } from "mongoose";
import { IUsuario } from "../interfaces/IUser";

// Creamos el esquema
const usuarioSchema: Schema = new Schema<IUsuario>(
  {
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    puntos: { type: Number, required: true },
  },
  {
    strict: true,
  }
);

// Creamos y exportamos el modelo
const Usuario = mongoose.model<IUsuario>("Usuario", usuarioSchema);
export default Usuario;
