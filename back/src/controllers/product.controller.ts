import { Request, Response } from "express";
import Producto from "../models/Producto"; // Asegúrate de que la ruta es correcta
import { IProducto } from "../interfaces/IProducto";
import { obtenerRecursoPorId } from "../helpers/dbfunctions";
import { obtenerInfoRedis, saveResult } from "../helpers/redisfunction";

export const obtenerProductos = async (req: Request, res: Response) => {
  try {
    const reply = await obtenerInfoRedis(res, "product");
    if (reply) {
      res.json(reply);
      return;
    }
    const productos = await Producto.find().lean();
    await saveResult(productos, "product");
    res.json({ productos: productos });
  } catch (error) {
    console.log(error);
  }
};

export const obtenerProductoId = async (req: Request, res: Response) => {
  await obtenerRecursoPorId(Producto, req.params.id, res, "product");
};

export const editarProducto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const productoActualizado = await Producto.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true } // Devuelve el documento actualizado
    );

    if (productoActualizado) {
      res.json({ producto: productoActualizado });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al editar producto" });
  }
};

export const eliminarProducto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productoEliminado = await Producto.findByIdAndDelete(id);

    if (productoEliminado) {
      res.json({ message: "Producto eliminado" });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto" });
  }
};

export const agregarProducto = async (req: Request, res: Response) => {
  try {
    const { nombre, precio, stock, costo } = req.body;

    const productoExistente = await Producto.findOne({ nombre }).lean();
    if (productoExistente) {
      res.status(400).json({ error: "Producto ya registrado" });
      return;
    }

    const productoNuevo: IProducto = new Producto({
      nombre,
      precio,
      stock,
      costo,
    });
    await productoNuevo.save();

    res.status(201).json({ producto: productoNuevo });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar producto" });
  }
};
