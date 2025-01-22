import { Request, Response } from "express";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { ACCESS_TOKEN } from "../config";
import { PayerRequest } from "mercadopago/dist/clients/payment/create/types";
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import { buscarCrearUsuario } from "../services/user.service";
import { crearPedido } from "../services/order.service";
import { IPedidoProducto } from "../interfaces/IPedidoProducto";
import { IPedido } from "../interfaces/IPedido";
import { crearPayer, crearListaItems } from "../helpers/paymentfunctions";

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

    const items = crearListaItems(productos);

    // Buscar o crear el usuario
    const usuario = await buscarCrearUsuario(payerData);

    console.log(usuario);
    // Crear el pedido
    let nuevoPedido: IPedido = await crearPedido(productos, usuario); // Llamamos al servicio de crearPedido

    // Configuración del comprador (Payer)
    const payer: PayerRequest = crearPayer(payerData);

    const preference = new Preference(client);

    // Crear la preferencia de pago
    await preference
      .create({
        body: {
          items,
          back_urls: {
            success: `http://localhost:5050/api/payment/success?id=${nuevoPedido._id}`,
            failure: `http://localhost:5050/api/payment/failure?id=${nuevoPedido._id}`,
            pending: `http://localhost:5050/api/payment/pending?id=${nuevoPedido._id}`,
          },
          auto_return: "approved",
          expires: true, // Habilitar expiración
          expiration_date_from: new Date().toISOString(), // Desde ahora
          expiration_date_to: new Date(
            Date.now() + 20 * 60 * 1000
          ).toISOString(), // 20 minutos después
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
