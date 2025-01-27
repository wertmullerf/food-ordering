import { Request, Response } from "express";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { ACCESS_TOKEN, BASE_NGROK_URL } from "../config";
import { PayerRequest } from "mercadopago/dist/clients/payment/create/types";
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import { buscarCrearUsuario } from "../services/user.service";
import { crearPedido } from "../services/order.service";
import { IPedidoProducto } from "../interfaces/IPedidoProducto";
import {
  crearPayer,
  crearListaItems,
  generarExternalReference,
} from "../helpers/paymentfunctions";

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

    // Configuración del comprador (Payer)
    const payer: PayerRequest = crearPayer(payerData);

    const preference = new Preference(client);

    try {
      const pago_id = generarExternalReference();
      // Crear la preferencia de pago
      const response: PreferenceResponse = await preference.create({
        body: {
          items,
          back_urls: {
            success: "https://www.google.com.ar",
          },
          auto_return: "approved",
          expires: true, // Habilitar expiración
          expiration_date_from: new Date().toISOString(), // Desde ahora
          expiration_date_to: new Date(
            Date.now() + 20 * 60 * 1000
          ).toISOString(), // 20 minutos después
          notification_url: `${BASE_NGROK_URL}/api/payment/webhook`,
          external_reference: pago_id,
        },

        requestOptions: {
          timeout: 5000,
        },
      });
      console.log(`${BASE_NGROK_URL}/api/payment/webhook`);
      const paymentUrl = response?.init_point;

      //console.log(response);
      if (paymentUrl) {
        // Buscar o crear el usuario
        const usuario = await buscarCrearUsuario(payerData);

        // Crear el pedido con el paymentID y el usuario
        await crearPedido(productos, usuario, pago_id);

        // Responder con la URL de pago generada
        res.json({ url: paymentUrl });
      } else {
        res
          .status(400)
          .json({ message: "Error al generar la preferencia de pago" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al crear la preferencia de pago" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al crear la orden de pago" });
  }
};
