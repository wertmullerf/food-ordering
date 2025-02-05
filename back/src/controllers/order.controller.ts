import Pedido from "../models/Pedido";
import { Request, Response } from "express";
import { obtenerInfoRedis, saveResult } from "../helpers/redisfunction";
import Ingrediente from "../models/Ingrediente";

export const obtenerOrdenes = async (req: Request, res: Response) => {
  try {
    const reply = await obtenerInfoRedis(res, "order");
    if (reply) {
      res.json(reply);
      return;
    }
    const orders = await Pedido.find().lean();
    await saveResult(orders, "order");
    res.json({ pedidos: orders });
  } catch (error) {
    console.log(error);
  }
};

export const obtenerOrdenId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const recurso = await Pedido.findOne({ pago_id: id });
    if (recurso) {
      return res.json(recurso);
    } else {
      return res.status(404).json({ error: `Pedido no encontrado` });
    }
  } catch (error) {
    res.json({ ERROR: "PEDIDO INEXISTENTE" });
  }
};

export const editarOrden = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const pedidoActualizado = await Pedido.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true } // Devuelve el documento actualizado
    );

    if (pedidoActualizado) {
      res.json({ producto: pedidoActualizado });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al editar producto" });
  }
};

export const eliminarOrden = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pedidoEliminado = await Pedido.findByIdAndDelete(id);

    if (pedidoEliminado) {
      res.json({ message: "Producto eliminado" });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto" });
  }
};
