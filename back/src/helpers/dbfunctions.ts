import { obtenerInfoRedis, saveResult } from "./redisfunction";
import { Response } from "express";
import { Model } from "mongoose";
import Ingrediente from "../models/Ingrediente";
import { IIngrediente } from "../interfaces/IIngrediente";

export const obtenerRecursoPorId = async <T extends Document>(
  modelo: Model<T & Document>, // Modelo genérico con tipos extendidos
  id: string,
  res: Response,
  nombreModelo: string
) => {
  try {
    const ID = `${nombreModelo}${id}`;
    const reply = await obtenerInfoRedis(res, ID);
    if (reply) {
      res.json(reply);
      return;
    }
    const recurso = await modelo.findById(id).lean();
    if (recurso) {
      saveResult(recurso, ID);
      return res.json(recurso);
    } else {
      return res
        .status(404)
        .json({ error: `${modelo.modelName} no encontrado` });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al obtener ${modelo.modelName}` });
  }
};

export const obtenerIngredientesExtras = async (
  extraIds: string[]
): Promise<IIngrediente[]> => {
  if (extraIds.length === 0) return [];

  try {
    return await Ingrediente.find({ _id: { $in: extraIds } }).lean(); // Usar lean() para mejorar rendimiento si solo lees los datos
  } catch (error) {
    console.error("Error obteniendo ingredientes extras:", error);
    return [];
  }
};
