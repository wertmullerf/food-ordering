import { Request, Response } from "express";
import Pedido from "../models/Pedido";
import { PedidoEstatus } from "../enums/PedidoEstatus";
import { IPedidoProducto } from "../interfaces/IPedidoProducto";
import Usuario from "../models/Usuario";
import { verificarUsuario } from "../services/user.service";

export const exitoso = async (req: Request, res: Response) => {
  try {
    const data = req.query as unknown as PaymentResponse;
    const { id } = req.query;

    await Pedido.findOneAndUpdate(
      { _id: id },
      { $set: { estatus: PedidoEstatus.Confirmado } }, // Chequear esto, si actualizo de esta forma debo poner strict en los modelos para no agregar campos nuevos
      { new: true }
    );

    //*Procesar el estado del pago en la base de datos
    res.status(200).json({
      message: "Pago realizado de forma exitosa",
      data,
    });
  } catch (error) {
    console.log("Error en el pago: ", error);
  }
};

export const fallido = async (req: Request, res: Response) => {
  try {
    const data = req.query as unknown as PaymentResponse;
    const { id } = req.query;
    const pedido = await Pedido.findById(id);
    await Pedido.findByIdAndDelete(id);
    await verificarUsuario(pedido?.usuario_id);
    res.json({ error: "Pedido cancelado por error en el proceso de compra" });
  } catch (error) {
    console.log("Error en el pago: ", error);
  }
};

export const pendiente = async (req: Request, res: Response) => {
  try {
    const data = req.query as unknown as PaymentResponse;
    console.log("Data del pago recibido:", data);
  } catch (error) {
    console.log("Error en el pago: ", error);
  }
};

export const crearPayer = (payerData: any) => {
  return {
    email: payerData.email,
    first_name: payerData.first_name,
    last_name: payerData.last_name,
    phone: payerData.phone,
    address: payerData.address,
    identification: payerData.identification,
  };
};

export const crearListaItems = (productos: IPedidoProducto[]) => {
  return productos.map((producto) => ({
    id: "",
    title: producto.nombre as string,
    quantity: producto.cantidad,
    unit_price: producto.precio_unitario,
  }));
};
