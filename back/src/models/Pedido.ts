import mongoose, { Schema, Document } from "mongoose";
import { IUsuario } from "./Usuario";
import { PedidoEstatus } from "../enums/PedidoEstatus";
import { IProducto } from "./Producto";
// Interfaz del pedido
export interface IProductoPedido extends Document {
  producto_id: IProducto["_id"];
  cantidad: number;
  precio: number;
}
export interface IPedido extends Document {
  usuario_id: IUsuario["_id"];
  estatus: PedidoEstatus;
  importe: number;
  productos: IProductoPedido[];
}

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
