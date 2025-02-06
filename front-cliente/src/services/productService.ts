import { IProducto } from "../types/IProducto";

const API_URL = "http://localhost:3000/api/product";

/**
 * Obtiene la lista de productos desde la API.
 * @returns {Promise<IProducto[]>} Array de productos.
 * @throws Error si la API responde incorrectamente.
 */
export const getProducts = async (): Promise<IProducto[]> => {
    try {
        const res = await fetch(API_URL);
        if (!res.ok)
            throw new Error(
                `Error ${res.status}: No se pudieron obtener los productos`
            );

        const data = await res.json();

        if (!Array.isArray(data)) {
            console.error(
                "Error: La API no devolvió un array de productos:",
                data
            );
            return []; // Evita que el frontend rompa si la API responde incorrectamente
        }

        return data;
    } catch (error) {
        console.error("Error en getProducts:", error);
        return [];
    }
};

/**
 * Obtiene un producto por su ID.
 * @param {string} id - ID del producto a buscar.
 * @returns {Promise<IProducto | null>} Producto encontrado o null si falla.
 * @throws Error si la API responde incorrectamente.
 */
export const getProductById = async (id: string): Promise<IProducto | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok)
            throw new Error(
                `Error ${response.status}: No se pudo obtener el producto`
            );

        const data = await response.json();

        if (!data || typeof data !== "object") {
            console.error(
                "Error: La API no devolvió un producto válido:",
                data
            );
            return null;
        }

        return data;
    } catch (error) {
        console.error("Error en getProductById:", error);
        return null;
    }
};
