import { Request, Response } from "express";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { ACCESS_TOKEN } from "../config";
import { PayerRequest } from "mercadopago/dist/clients/payment/create/types";
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import { buscarCrearUsuario } from "../services/user.service"; // Importar la función
import Pedido from "../models/Pedido";

const client = new MercadoPagoConfig({
  accessToken: ACCESS_TOKEN,
  options: { timeout: 5000, idempotencyKey: "abc" },
});
const payment = new Payment(client);

export const crearOrden = async (req: Request, res: Response) => {
  try {
    const { payerData, items } = req.body;

    if (!payerData || !items) {
      res.status(400).json({ message: "Faltan datos requeridos" });
      return;
    }

    // Usar la función para obtener o crear al usuario
    await buscarCrearUsuario(payerData);

    // Configuración del comprador (Payer)
    const payer: PayerRequest = {
      email: payerData.email,
      first_name: payerData.first_name,
      last_name: payerData.last_name,
      phone: payerData.phone,
      address: payerData.address,
      identification: payerData.identification,
    };

    let result: PreferenceResponse | undefined;
    const preference = new Preference(client);

    // Crear la preferencia de pago
    await preference
      .create({
        body: {
          items,
          payer,
          redirect_urls: {
            success: "https://www.example.com/success",
            failure: "https://www.example.com/failure",
            pending: "https://www.example.com/pending",
          },
          back_urls: {
            success: "http://localhost:5050/api/payment/success",
            failure: "http://localhost:5050/api/payment/failure",
            pending: "http://localhost:5050/api/payment/pending",
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
    console.log("Data del pago recibido:", data);
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
    console.log("Data del pago recibido:", data);
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
