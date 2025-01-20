import Usuario from "../models/Usuario";
import { Request, Response } from "express";

export const obtenerUsuarios = async (req: Request, res: Response) => {
  try {
    const users = await Usuario.find().lean();
    res.json({ usuarios: users });
  } catch (error) {
    console.log(error);
  }
};

export const obtenerUsuarioId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id; // la autoincremental?
    const user = await Usuario.findById(id).lean();
    res.json({ Usuario: user });
  } catch (error) {
    console.log(error);
  }
};

export const editarUsuario = async (req: Request, res: Response) => {
  try {
    const updates = req.body;
    const { id } = req.params;
    const usuarioActualizado = await Usuario.findOneAndUpdate(
      { _id: id },
      { $set: updates }, // Chequear esto, si actualizo de esta forma debo poner strict en los modelos para no agregar campos nuevos
      { new: true }
    );
    console.log("Usuario actualizado:", usuarioActualizado);
    res.json({ Usuario: usuarioActualizado });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
  }
};

export const eliminarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Usuario.findByIdAndDelete(id);
    res.json({ msg: "usuario eliminado" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json(error);
  }
};
/*
export const agregarUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, email } = req.body;
    const existingUser = await Usuario.findOne({ email });
    if (existingUser) {
      res.json("Usuario ya registrado");
      return;
    }
    const puntos = 0;
    const usuario = new Usuario({ nombre, apellido, email, puntos });
    await usuario.save();
    res.json({ msg: "usuario agregado" });
  } catch (error) {
    console.error("Error al agregar usuario:", error);
    res.status(500).json(error);
  }
};
*/
