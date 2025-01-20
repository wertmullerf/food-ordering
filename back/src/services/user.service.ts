// src/services/user.service.ts
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
  console.log(usuario);
  return usuario;
};
