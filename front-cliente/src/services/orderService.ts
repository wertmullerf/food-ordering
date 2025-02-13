import { IPedido } from "../types/IPedido";
import { API_BASE_URL } from "../config";

const API_URL = "http://192.168.0.61:3000/api/order";

export const getOrderById = async (id: string): Promise<IPedido> => {
  const res = await fetch(`${API_URL}/${id}`);
  console.log(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Error fetching order");
  return res.json() as Promise<IPedido>;
};

export const createOrder = async (orderData: any) => {
  const response = await fetch(`${API_BASE_URL}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) throw new Error("Error al crear orden");
  return response.json();
};
