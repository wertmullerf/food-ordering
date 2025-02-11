import { IPedidoProducto } from "../interfaces/IPedidoProducto";

export const arePersonalizacionesEqual = (
  p1: IPedidoProducto["personalizaciones"],
  p2: IPedidoProducto["personalizaciones"]
): boolean => {
  // Compara las personalizaciones de forma simple.
  return JSON.stringify(p1) === JSON.stringify(p2);
};

export const agruparProductosIdenticos = (
  productos: IPedidoProducto[]
): IPedidoProducto[] => {
  return productos.reduce((acc: IPedidoProducto[], producto) => {
    // Convierte producto_id a cadena usando casting
    const pid = (producto.producto_id as any).toString();

    const productoExistente = acc.find((p) => {
      const p_pid = (p.producto_id as any).toString();
      return (
        p_pid === pid &&
        arePersonalizacionesEqual(
          p.personalizaciones,
          producto.personalizaciones
        )
      );
    });

    if (productoExistente) {
      productoExistente.cantidad += producto.cantidad;
      return acc;
    } else {
      // Agrega el nuevo producto; se utiliza casting para forzar que sea del tipo IPedidoProducto
      return [
        ...acc,
        { ...producto, cantidad: producto.cantidad } as IPedidoProducto,
      ];
    }
  }, [] as IPedidoProducto[]);
};
