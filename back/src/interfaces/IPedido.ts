import { Document } from "mongoose";
import { IUsuario } from "./IUser";
import { PedidoEstatus } from "../enums/PedidoEstatus";
import { IProductoPedido } from "./IPedidoProducto";

export interface IPedido extends Document {
  usuario_id: IUsuario["_id"];
  estatus: PedidoEstatus;
  importe: number;
  productos: IProductoPedido[];
}
