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
  generarPreferencia,
} from "../helpers/paymentfunctions";
import { crearDireccion } from "../services/address.service";

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
    const payer: PayerRequest = crearPayer(payerData); // Configuración del comprador (Payer)
    const preference = new Preference(client);
    try {
      const pago_id = generarExternalReference();
      const response: PreferenceResponse = await generarPreferencia(
        // Crear la preferencia de pago
        preference,
        items,
        pago_id,
        BASE_NGROK_URL!
      );
      //console.log(`${BASE_NGROK_URL}/api/payment/webhook`);
      const paymentUrl = response?.init_point;

      //console.log(response);
      if (paymentUrl) {
        const usuario = await buscarCrearUsuario(payerData); // Buscar o crear el usuario
        const direccion: string = await crearDireccion(payerData["address"]);
        await crearPedido(productos, usuario, direccion, pago_id); // Crear el pedido con el paymentID y el usuario
        res.json({ url: paymentUrl }); // Responder con la URL de pago generada
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
