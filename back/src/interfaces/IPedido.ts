import { Document } from "mongoose";
import { IUsuario } from "./IUser";
import { PedidoEstatus } from "../enums/PedidoEstatus";
import { IPedidoProducto } from "../interfaces/IPedidoProducto";

export interface IPedido extends Document {
  usuario_id: IUsuario["_id"];
  estatus: PedidoEstatus;
  total: number;
  productos: IPedidoProducto[];
  pago_id?: String;
  createdAt?: Date; // Opcional si Mongoose lo crea automáticamente
  updatedAt?: Date;
}
