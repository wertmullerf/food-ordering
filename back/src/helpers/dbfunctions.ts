import { Response } from "express";
import { Model } from "mongoose";

export const obtenerRecursoPorId = async <T extends Document>(
  modelo: Model<T & Document>, // Modelo genérico con tipos extendidos
  id: string,
  res: Response
) => {
  try {
    const recurso = await modelo.findById(id).lean();
    if (recurso) {
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
