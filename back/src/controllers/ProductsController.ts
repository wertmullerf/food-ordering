import { IProducto } from "../interfaces/IProducto";
import Producto from "../models/Producto";
import { Request, Response } from "express";

const obtenerProductos = async (req: Request, res: Response) => {
  try {
    const productos = await Producto.find().lean();
    res.json({ Productos: productos });
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener productos" });
  }
};

const obtenerProductosId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await Producto.findById({ id });
    return product
      ? res.json({ Producto: product })
      : res.json({ error: "No existe el producto" });
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener productos" });
  }
};

const editarProducto = async (req: Request, res: Response) => {
  try {
    const updates = req.body;
    const productId = req.params;
    const productoActualizado = await Producto.findOneAndUpdate(
      { _id: productId },
      { $set: updates }, // Chequear esto, si actualizo de esta forma debo poner strict en los modelos para no agregar campos nuevos
      { new: true }
    );
    console.log("Usuario actualizado:", productoActualizado);
  } catch (error) {
    return res.status(500).json({ message: "Error al editar productos" });
  }
};

const eliminarProducto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Producto.findByIdAndDelete(id);
    res.json({ msg: "usuario eliminado" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar producto" });
  }
};

const agregarProducto = async (req: Request, res: Response) => {
  try {
    const { nombre, precio, stock, costo } = req.body;
    const producto = await Producto.findOne({ nombre }).lean();
    if (producto) {
      return res.status(400).json("Producto ya registrado");
    }
    const productoNuevo: IProducto = new Producto({
      nombre,
      precio,
      stock,
      costo,
    });
    productoNuevo.save();
  } catch (error) {
    return res.status(500).json({ message: "Error al agregar producto" });
  }
};

module.exports = {
  obtenerProductos,
  obtenerProductosId,
  editarProducto,
  eliminarProducto,
  agregarProducto,
};
