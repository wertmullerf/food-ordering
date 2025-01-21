import { PedidoEstatus } from "../enums/PedidoEstatus";
import { IPedidoProducto } from "../interfaces/IPedidoProducto";
import { IProducto } from "../interfaces/IProducto";
import { IUsuario } from "../interfaces/IUser";
import Pedido from "../models/Pedido";

export const crearPedido = async (
  productos: IPedidoProducto[],
  usuario: IUsuario
) => {
  const total = productos.reduce(
    (acc: number, producto: IPedidoProducto) =>
      acc + producto.precio_unitario * producto.cantidad,
    0
  );

  const nuevoPedido = new Pedido({
    usuario_id: usuario._id,
    estatus: PedidoEstatus.Pendiente,
    productos,
    total, // El total calculado
  });

  // Guardar el pedido en la base de datos
  await nuevoPedido.save();

  return nuevoPedido;
};
