import Pedido from "../models/Pedido";
import Usuario from "../models/Usuario";
import { Request, Response } from "express";

const obtenerOrdenes = async (req: Request, res: Response) => {
  try {
    const orders = await Pedido.find().lean();
    res.json({ pedidos: orders });
  } catch (error) {
    console.log(error);
  }
};

const obtenerOrdenId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id; // la autoincremental?
    const order = await Pedido.findById(id).lean();
    res.json({ orden: order });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  obtenerOrdenes,
  obtenerOrdenesId,
  editarOrden,
  eliminarOrden,
  agregarOrden,
};
