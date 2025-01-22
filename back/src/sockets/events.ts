import { Socket } from "socket.io";

/**
 * Registra los eventos personalizados para un socket.
 * @param socket - Instancia de Socket.IO del cliente conectado
 */
export const registerSocketEvents = (socket: Socket): void => {
  // Maneja el evento "mensaje"
  socket.on("mensaje", (data: { texto: string }) => {
    console.log("Mensaje recibido del cliente:", data.texto);

    // Responde al cliente con un evento "respuesta"
    socket.emit("respuesta", { mensaje: "Mensaje recibido en el servidor" });
  });

  // Maneja otros eventos
  socket.on("otroEvento", (data: any) => {
    console.log("Otro evento recibido:", data);
  });
};
