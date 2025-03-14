import { Request, Response } from "express";
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

export const obtenerIngredientesExtras = async (
  req: Request,
  res: Response
) => {
  try {
    const extras = await Ingrediente.find({ precioExtra: { $gt: 0 } }).lean();
    res.json(extras);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los ingredientes extra",
    });
  }
};

export const obtenerIngredientes = async (req: Request, res: Response) => {
  try {
    const ingredientes = await Ingrediente.find().lean();
    res.json(ingredientes);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los ingredientes extra",
    });
  }
};
