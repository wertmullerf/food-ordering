import { API_ENDPOINTS } from "../config";

export const getIngredientes = async () => {
  const response = await fetch(`${API_ENDPOINTS.base}/ingredient`);
  if (!response.ok) throw new Error("Error al obtener ingredientes");
  return response.json();
};

export const getExtras = async () => {
  const response = await fetch(`${API_ENDPOINTS.base}/ingredient/extras`);
  if (!response.ok) throw new Error("Error al obtener extras");
  return response.json();
};

export const getIngredienteById = async (id: string) => {
  const response = await fetch(`${API_ENDPOINTS.base}/ingredient/${id}`);
  if (!response.ok) throw new Error("Error al obtener ingrediente");
  return response.json();
};
