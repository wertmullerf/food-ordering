export async function fetchOrderData(id: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/order/${id}`);
    if (!response.ok) {
      // Retorna null si el pedido no es encontrado o hay un error con la respuesta
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    // Retorna null en caso de error para no romper el flujo
    return null;
  }
}
