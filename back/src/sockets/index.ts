import { Server } from "socket.io";
const { registerSocketEvents } = require("./events");

/**
 * Inicializa Socket.IO y configura la conexión.
 * @param io - Instancia del servidor Socket.IO
 */

export const initializeSockets = (io: Server): void => {
  io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);

    // Registra eventos personalizados
    registerSocketEvents(socket);

    // Evento de desconexión
    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);
    });
  });
};
