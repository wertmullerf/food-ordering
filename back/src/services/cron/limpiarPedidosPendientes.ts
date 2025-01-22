import cron from "node-cron";
import Pedido from "../../models/Pedido";
import { PedidoEstatus } from "../../enums/PedidoEstatus";

const eliminarPedidosPendientes = async () => {
  try {
    // Establecemos el tiempo límite como 1 hora atrás
    const tiempoLimite = new Date(Date.now() - 60 * 60 * 1000); // 1 hora en milisegundos

    // Eliminamos los pedidos pendientes cuya fecha de creación sea anterior al tiempo límite
    const resultado = await Pedido.deleteMany({
      estatus: PedidoEstatus.Pendiente,
      createdAt: { $lt: tiempoLimite }, // Comparando la fecha de creación
    });

    console.log(
      `Se eliminaron ${
        resultado.deletedCount
      } pedidos pendientes antiguos. ${new Date().toLocaleString()}`
    );
  } catch (error) {
    console.error("Error al eliminar pedidos pendientes: ", error);
  }
};

// Programamos el cron job para que se ejecute cada 10 minutos
cron.schedule("*/10 * * * *", async () => {
  console.log("Iniciando limpieza de pedidos pendientes...");
  await eliminarPedidosPendientes();
});
