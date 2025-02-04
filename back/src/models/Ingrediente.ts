import mongoose, { Schema } from "mongoose";
import { IIngrediente } from "../interfaces/IIngrediente";
const ingredienteSchema: Schema = new Schema<IIngrediente>({
    nombre: { type: String, required: true, unique: true },
    precioExtra: { type: Number, required: false, default: 0 },
    removible: { type: Boolean, required: true },
});

// Modelo de la dirección
const Ingrediente = mongoose.model<IIngrediente>(
    "Ingrediente",
    ingredienteSchema
);
export default Ingrediente;
