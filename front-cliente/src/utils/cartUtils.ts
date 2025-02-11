import { CartItem } from "../types/IProducto";

export const arePersonalizacionesEqual = (
  p1?: CartItem["personalizaciones"],
  p2?: CartItem["personalizaciones"]
): boolean => {
  // Si ambos son nulos o undefined, son iguales
  if (!p1 && !p2) return true;
  // Si solo uno existe, son diferentes
  if (!p1 || !p2) return false;

  // Ordenar los extras (se asume que son de tipo { id: string; cantidad: number }[])
  const sortExtras = (arr: { id: string; cantidad: number }[]) =>
    [...arr].sort((a, b) => a.id.localeCompare(b.id));

  // Ordenar removidos suponiendo que son strings
  const sortRemovidos = (arr: string[]) =>
    [...arr].sort((a, b) => a.localeCompare(b));

  const extrasEqual =
    JSON.stringify(sortExtras(p1.extras)) ===
    JSON.stringify(sortExtras(p2.extras));

  const removidosEqual =
    JSON.stringify(sortRemovidos(p1.removidos)) ===
    JSON.stringify(sortRemovidos(p2.removidos));

  return extrasEqual && removidosEqual;
};

export const agruparProductos = (productos: CartItem[]): CartItem[] => {
  return productos.reduce<CartItem[]>((acc, item) => {
    const existente = acc.find(
      (i) =>
        i._id === item._id &&
        arePersonalizacionesEqual(i.personalizaciones, item.personalizaciones)
    );
    if (existente) {
      // Sumar la cantidad de los productos iguales
      existente.cantidad += item.cantidad;
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
};
