import Pedido from "../models/Pedido";
import { Request, Response } from "express";

export const obtenerOrdenes = async (req: Request, res: Response) => {
  try {
    const orders = await Pedido.find().lean();
    res.json({ pedidos: orders });
  } catch (error) {
    console.log(error);
  }
};

export const obtenerOrdenId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id; // la autoincremental?
    const order = await Pedido.findById(id).lean();
    res.json({ orden: order });
  } catch (error) {
    console.log(error);
  }
};
