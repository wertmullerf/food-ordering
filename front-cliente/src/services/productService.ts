import { Product } from "../types/product";

const API_URL = "http://localhost:3000/api/product";

export const getProducts = async (): Promise<Product[]> => {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data;
};

export const getProductById = async (id: string): Promise<Product> => {
    const res = await fetch(`${API_URL}/${id}`);
    return res.json();
};
