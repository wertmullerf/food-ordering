import Usuario from "../models/Usuario";
import { Request, Response } from "express";

const obtenerUsuarios = async (req: Request, res: Response) => {
  try {
    const users = await Usuario.find().lean();
    res.json({ usuarios: users });
  } catch (error) {
    console.log(error);
  }
};

const obtenerUsuarioId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id; // la autoincremental?
    const user = await Usuario.findById(id).lean();
    res.json({ Usuario: user });
  } catch (error) {
    console.log(error);
  }
};

const editarUsuario = async (req: Request, res: Response) => {
  try {
    const updates = req.body;
    const userId = req.params;
    const usuarioActualizado = await Usuario.findOneAndUpdate(
      { _id: userId },
      { $set: updates }, // Chequear esto, si actualizo de esta forma debo poner strict en los modelos para no agregar campos nuevos
      { new: true }
    );
    console.log("Usuario actualizado:", usuarioActualizado);
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
  }
};

const eliminarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Usuario.findByIdAndDelete(id);
    res.json({ msg: "usuario eliminado" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json(error);
  }
};

const agregarUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, email } = req.params;
    const existingUser = await Usuario.findOne({ email });
    if (existingUser) {
      return res.status(400).json("Usuario ya registrado");
    }
    const puntos = 0;
    const usuario = new Usuario({ nombre, apellido, email, puntos });
    usuario.save();
    res.json({ msg: "usuario agregado" });
  } catch (error) {
    console.error("Error al agregar usuario:", error);
    res.status(500).json(error);
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioId,
  editarUsuario,
  eliminarUsuario,
  agregarUsuario,
};
