import { Request, Response } from "express";
import { obtenerInfoRedis, saveResult } from "../helpers/redisfunction";
import Ingrediente from "../models/Ingrediente";

export const agregarIngrediente = async (req: Request, res: Response) => {
  try {
    const { nombre, precioExtra = 0, removible } = req.body;
    const existingIngrediente = await Ingrediente.findOne({ nombre });
    if (existingIngrediente) {
      res.json("Ingrediente ya registrado");
      return;
    }
    const ingrediente = new Ingrediente({ nombre, precioExtra, removible });
    await ingrediente.save();
    res.json({ msg: "ingrediente agregado" });
  } catch (error) {
    console.error("Error al agregar ingrediente:", error);
    res.status(500).json(error);
  }
};
