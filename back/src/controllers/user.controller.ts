import Usuario from "../models/Usuario";
import { Request, Response } from "express";
import { obtenerRecursoPorId } from "../helpers/dbfunctions";
import { obtenerInfoRedis, saveResult } from "../helpers/redisfunctions";

export const obtenerUsuarios = async (req: Request, res: Response) => {
  try {
    const reply = await obtenerInfoRedis(res, "user");
    if (reply) {
      res.json(reply);
      return;
    }
    const usuarios = await Usuario.find().lean();
    await saveResult(usuarios, "user");
    res.json({ users: usuarios });
  } catch (error) {
    console.log(error);
  }
};

export const obtenerUsuarioId = async (req: Request, res: Response) => {
  await obtenerRecursoPorId(Usuario, req.params.id, res, "user");
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
