// services/productService.ts
import { Product } from "../types/IProducto";

const API_URL = "http://localhost:3000/api/product";

export const getProducts = async (): Promise<Product[]> => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error fetching products");
    return res.json() as Promise<Product[]>;
};

export const getProductById = async (id: string): Promise<Product> => {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Error fetching product");
    return res.json() as Promise<Product>;
};
