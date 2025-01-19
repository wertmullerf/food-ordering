import mongoose, { Schema } from "mongoose";
import { IPedido } from "../interfaces/IPedido";
import { PedidoEstatus } from "../enums/PedidoEstatus";

// Esquema del pedido
const pedidoSchema: Schema = new Schema<IPedido>({
  usuario_id: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  estatus: {
    type: String,
    enum: Object.values(PedidoEstatus),
    required: true,
    lowercase: true,
  },
  productos: [],
  importe: { type: Number, required: true },
});

// Modelo del pedido
const Pedido = mongoose.model<IPedido>("Pedido", pedidoSchema);
export default Pedido;
