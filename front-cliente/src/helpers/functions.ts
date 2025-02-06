import { IProducto } from "../types/IProducto";

export const agruparPorCategoria = (
    productos: IProducto[]
): Record<string, IProducto[]> => {
    if (!Array.isArray(productos)) {
        console.error("productos no es un array:", productos);
        return {}; // Retorna un objeto vacío en caso de que no sea un array
    }

    return productos.reduce((acc, producto) => {
        acc[producto.categoria] = acc[producto.categoria] || [];
        acc[producto.categoria].push(producto);
        return acc;
    }, {} as Record<string, IProducto[]>);
};

export const capitalize = (word: string) => {
    return String(word).charAt(0).toUpperCase() + String(word).slice(1);
};
