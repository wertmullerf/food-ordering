import { Socket } from "socket.io";

/**
 * Registra los eventos personalizados para un socket.
 * @param socket - Instancia de Socket.IO del cliente conectado
 */

export const registerSocketEvents = (socket: Socket): void => {
  socket.on("soy_admin", () => {
    socket.join("admins"); // Agregar al admin a un grupo "admins"
  });
};
