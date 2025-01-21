import { Request, Response } from "express";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { ACCESS_TOKEN } from "../config";
import { PayerRequest } from "mercadopago/dist/clients/payment/create/types";
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import { buscarCrearUsuario } from "../services/user.service"; // Importar la función
import Pedido from "../models/Pedido";
import { crearPedido } from "../services/order.service";
import { IPedidoProducto } from "../interfaces/IPedidoProducto";
import { IPedido } from "../interfaces/IPedido";
import { PedidoEstatus } from "../enums/PedidoEstatus";

const client = new MercadoPagoConfig({
  accessToken: ACCESS_TOKEN,
  options: { timeout: 5000, idempotencyKey: "abc" },
});
const payment = new Payment(client);

export const crearOrden = async (req: Request, res: Response) => {
  try {
    const { payerData } = req.body;
    const productos: IPedidoProducto[] = req.body.items;

    if (!payerData || !productos) {
      res.status(400).json({ message: "Faltan datos requeridos" });
      return;
    }

    const items = productos.map((producto) => ({
      id: "",
      title: producto.nombre as string,
      quantity: producto.cantidad,
      unit_price: producto.precio_unitario,
    }));
    // Buscar o crear el usuario
    const usuario = await buscarCrearUsuario(payerData);

    console.log(usuario);
    // Crear el pedido
    let nuevoPedido: IPedido = await crearPedido(productos, usuario); // Llamamos al servicio de crearPedido

    // Configuración del comprador (Payer)
    const payer: PayerRequest = {
      email: payerData.email,
      first_name: payerData.first_name,
      last_name: payerData.last_name,
      phone: payerData.phone,
      address: payerData.address,
      identification: payerData.identification,
    };

    const preference = new Preference(client);

    // Crear la preferencia de pago
    await preference
      .create({
        body: {
          items,
          /*redirect_urls: {
            success: "https://www.example.com/success",
            failure: "https://www.example.com/failure",
            pending: "https://www.example.com/pending",
          },*/
          back_urls: {
            success: `http://localhost:5050/api/payment/success?id=${nuevoPedido._id}`,
            failure: `http://localhost:5050/api/payment/failure?id=${nuevoPedido._id}`,
            pending: `http://localhost:5050/api/payment/pending?id=${nuevoPedido._id}`,
          },
          auto_return: "approved",
        },
        requestOptions: {
          timeout: 5000,
        },
      })
      .then((response: PreferenceResponse) => {
        // Acceder al URL de pago
        const paymentUrl = response?.init_point;

        if (paymentUrl) {
          // Responder con la URL de pago generada
          res.json({ url: paymentUrl });
        } else {
          res
            .status(400)
            .json({ message: "Error al generar la preferencia de pago" });
        }
      })
      .catch((err) => {
        console.log("Error al crear la preferencia: ", err);
        res
          .status(500)
          .json({ message: "Error al crear la preferencia de pago" });
      });
  } catch (error) {
    console.log("Error al crear un pago: ", error);
    res.status(500).json({ message: "Error al crear la orden de pago" });
  }
};

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
    await Pedido.findByIdAndDelete(id);
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
