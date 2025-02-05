import { IPedido } from "../types/IPedido";

const API_URL = "http://localhost:3000/api/order";

export const getOrderById = async (id: string): Promise<IPedido> => {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Error fetching order");
    return res.json() as Promise<IPedido>;
};
