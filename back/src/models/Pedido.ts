import mongoose, { Schema } from "mongoose";
import { IPedido } from "../interfaces/IPedido";
import { PedidoEstatus } from "../enums/PedidoEstatus";

// Esquema del pedido
const pedidoSchema: Schema = new Schema<IPedido>(
  {
    usuario_id: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
    estatus: {
      type: String,
      enum: Object.values(PedidoEstatus),
      required: true,
      lowercase: true,
    },
    productos: [
      {
        producto_id: { type: Schema.Types.ObjectId, ref: "Producto" },
        nombre: { type: String, required: true },
        cantidad: { type: Number, required: true },
        precio_unitario: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
  },
  {
    strict: true,
  }
);

// Modelo del pedido
const Pedido = mongoose.model<IPedido>("Pedido", pedidoSchema);
export default Pedido;
