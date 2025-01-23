import { MercadoPagoEstatus } from "./../enums/MercadoPagoEstatus";
import { ACCESS_TOKEN } from "./../config";
import { Request, Response } from "express";
import Pedido from "../models/Pedido";
import { PedidoEstatus } from "../enums/PedidoEstatus";
import { IPedidoProducto } from "../interfaces/IPedidoProducto";
import { verificarUsuario } from "../services/user.service";
import { IMercadoPagoResponse } from "../interfaces/IMercadoPagoResponse";

export const exitoso = async (id: number) => {
  try {
    const resultado = await Pedido.updateOne(
      { pago_id: id },
      { $set: { estatus: PedidoEstatus.Confirmado } }
    );
    console.log("Resultado de la actualización:", resultado);

    // Luego busca el pedido actualizado para asegurarte de que los cambios se aplicaron
    const pedidoActualizado = await Pedido.findOne({ pago_id: id });
    console.log("Pedido después de actualizar:", pedidoActualizado);
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

export const evaluarEstatus = (data: IMercadoPagoResponse) => {
  const estatus: MercadoPagoEstatus = data.status;
  console.log(estatus);
  switch (estatus) {
    case MercadoPagoEstatus.APPROVED:
    case MercadoPagoEstatus.AUTHORIZED:
      // Ejecuta la función para estados "aprobados/autorizados"
      exitoso(data.collector_id); //paso pago_id
      break;

    case MercadoPagoEstatus.REJECTED:
    case MercadoPagoEstatus.CANCELLED:
    case MercadoPagoEstatus.REFUNDED:
      // Ejecuta la función para estados "rechazados/cancelados/reembolsados"
      //fallido();
      break;

    default:
      // Opcional: Manejo de otros estados si es necesario
      console.log(`Estado no manejado: ${estatus}`);
      break;
  }
};

export const webhook = async (req: Request, res: Response) => {
  const payment = req.query;

  const paymentID = payment["data.id"];

  try {
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );
    if (response.ok) {
      const data: IMercadoPagoResponse = await response.json();
      evaluarEstatus(data);
    }
    res.sendStatus(200);
  } catch (error) {
    console.log("ERROR", error);
    res.sendStatus(500);
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
    id: producto._id as string,
    title: producto.nombre as string,
    quantity: producto.cantidad,
    unit_price: producto.precio_unitario,
  }));
};
