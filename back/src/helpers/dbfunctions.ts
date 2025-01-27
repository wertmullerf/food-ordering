import { obtenerInfoRedis, saveResult } from "./redisfunction";
import { Response } from "express";
import { Model } from "mongoose";

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
