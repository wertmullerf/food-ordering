import mongoose, { Schema } from "mongoose";
import { IPedido } from "../interfaces/IPedido";
import { PedidoEstatus } from "../enums/PedidoEstatus";

// Esquema del pedido
const pedidoSchema: Schema = new Schema<IPedido>(
  {
    usuario_id: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    direccion_id: {
      type: Schema.Types.ObjectId,
      ref: "Direccion",
      required: true,
    },

    estatus: {
      type: String,
      enum: Object.values(PedidoEstatus),
      required: true,
      //lowercase: true,
    },
    productos: [
      {
        producto_id: { type: Schema.Types.ObjectId, ref: "Producto" },
        nombre: { type: String, required: true },
        cantidad: { type: Number, required: true },
        precio: { type: Number, required: true },
        personalizaciones: {
          extras: [
            {
              id: { type: Schema.Types.ObjectId, ref: "Producto" },
              cantidad: { type: Number },
              _id: false,
            },
          ],
          removidos: [
            {
              id: { type: Schema.Types.ObjectId, ref: "Producto" },
              _id: false,
            },
          ],
        },
        _id: false,
      },
    ],
    total: { type: Number, required: true },
    pago_id: { type: String }, //El es external_reference
  },
  {
    timestamps: true,
    strict: true,
  }
);

// Modelo del pedido
const Pedido = mongoose.model<IPedido>("Pedido", pedidoSchema);
export default Pedido;
