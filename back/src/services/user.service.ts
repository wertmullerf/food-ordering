// src/services/user.service.ts
import { IUsuario } from "../interfaces/IUser";
import Usuario from "../models/Usuario";

export const buscarCrearUsuario = async (payerData: any) => {
  // Buscar si el usuario ya existe
  let usuario = await Usuario.findOne({ email: payerData.email });

  // Si el usuario no existe, crearlo
  if (!usuario) {
    usuario = new Usuario({
      nombre: payerData.first_name,
      apellido: payerData.last_name,
      email: payerData.email,
      puntos: 0, // Puntos iniciales
    });
    await usuario.save();
  }
  return usuario;
};

export const verificarUsuario = async (id: IUsuario["_id"]) => {
  const usuario: IUsuario | null = await Usuario.findById(id);
  if (usuario?.puntos == 0) {
    await Usuario.findByIdAndDelete(id);
  }
};
