export const getIngredientes = async () => {
    const response = await fetch("http://localhost:3000/api/ingredient");
    if (!response.ok) throw new Error("Error al obtener ingredientes");
    return response.json();
};

export const getExtras = async () => {
    const response = await fetch("http://localhost:3000/api/ingredient/extras");
    if (!response.ok) throw new Error("Error al obtener extras");
    return response.json();
};
