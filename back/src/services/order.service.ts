import { PedidoEstatus } from "../enums/PedidoEstatus";
import { IPedidoProducto } from "../interfaces/IPedidoProducto";
import { IUsuario } from "../interfaces/IUser";
import Pedido from "../models/Pedido";

export const crearPedido = async (
  productos: IPedidoProducto[],
  usuario: IUsuario,
  direccion: string,
  pago_id?: String
) => {
  const total = productos.reduce(
    (acc: number, producto: IPedidoProducto) => acc + producto.precio,
    0
  );

  const nuevoPedido = new Pedido({
    usuario_id: usuario._id,
    direccion_id: direccion,
    estatus: PedidoEstatus.Pendiente,
    productos,
    total,
    // El total calculado
    ...(pago_id && { pago_id }), // Agregar pago_id si está disponible
  });
  console.log(JSON.stringify(nuevoPedido));
  // Guardar el pedido en la base de datos
  await nuevoPedido.save();
  return nuevoPedido;
};
