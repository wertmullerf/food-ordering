import { Request, Response } from "express";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { ACCESS_TOKEN } from "../config";
import { PayerRequest } from "mercadopago/dist/clients/payment/create/types";
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";

const client = new MercadoPagoConfig({
  accessToken: ACCESS_TOKEN,
  options: { timeout: 5000, idempotencyKey: "abc" },
});
const payment = new Payment(client);

export const crearOrden = async (req: Request, res: Response) => {
  try {
    const payer: PayerRequest = {
      email: "comprador.nuevo@mail.com",
      first_name: "John",
      last_name: "Doe",
      phone: {
        area_code: "1",
        number: "1234567",
      },
      address: {
        street_name: "Calle 123",
        street_number: "123",
        zip_code: "123456",
        city: "Buenos Aires",
      },
      identification: {
        type: "DNI",
        number: "12345678",
      },
    };
    const itemsToPay = [
      {
        id: "001",
        title: "Producto #1",
        description: "Descripción del producto #1 a pagar",
        picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
        category_id: "1",
        quantity: 1,
        unit_price: 10000, //2.29 USD
      },
      {
        id: "002",
        title: "Producto 2",
        description: "Descripción del producto 2",
        picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
        category_id: "2",
        quantity: 2,
        unit_price: 20000, //4,58 USD
      },
    ];

    let result: PreferenceResponse | undefined;
    const preference = new Preference(client);
    await preference
      .create({
        body: {
          items: itemsToPay,
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
      .then((x) => {
        console.log(x);
        result = x;
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log("Error al crear un pago: ", error);
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
