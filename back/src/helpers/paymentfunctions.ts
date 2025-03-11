import { MercadoPagoEstatus } from "./../enums/MercadoPagoEstatus";
import { Request, Response } from "express";
import Pedido from "../models/Pedido";
import { PedidoEstatus } from "../enums/PedidoEstatus";
import { IPedidoProducto } from "../interfaces/IPedidoProducto";
import { verificarUsuario } from "../services/user.service";
import { IMercadoPagoResponse } from "../interfaces/IMercadoPagoResponse";
import { v4 as uuidv4 } from "uuid";
import { EmailService, enviarCorreoExitoso } from "../services/email/index";
import { IUsuario } from "../interfaces/IUser";
import { ACCESS_TOKEN } from "../config";
import { obtenerIngredientesExtras } from "./dbfunctions";
import { IIngrediente } from "../interfaces/IIngrediente";
import { Preference } from "mercadopago";
/*---------------NO TOCAR (TIENE HORAS ENCIMA) -------------------*/

export const exitoso = async (id: String) => {
  try {
    await Pedido.findOneAndUpdate(
      { pago_id: id },
      { $set: { estatus: PedidoEstatus.Confirmado } },
      { new: true } // Devuelve el documento actualizado
    );
  } catch (error) {
    console.log("Error en el pago: ", error);
  }
};
/*---------------NO TOCAR (TIENE HORAS ENCIMA) -------------------*/

export const fallido = async (id: String) => {
  try {
    const pedido = await Pedido.findOne({ pago_id: id });
    let usuario_id = pedido?.usuario_id;
    await Pedido.findOneAndDelete({ pago_id: id });
    await verificarUsuario(usuario_id);
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

const buscarUsuarioPorIdPago = async (
  pago_id: string
): Promise<IUsuario | null> => {
  try {
    const pedido = await Pedido.findOne({ pago_id: pago_id }).populate(
      "usuario_id"
    );
    const usuario = pedido!.usuario_id as IUsuario;
    return usuario;
  } catch (error) {
    console.log("ERROR");
    return null;
  }
};

const buscarProductosPorIdPago = async (
  pago_id: string
): Promise<IPedidoProducto[] | null> => {
  try {
    let productos: IPedidoProducto[] = [];
    const pedido = await Pedido.findOne({ pago_id: pago_id });
    productos = pedido!.productos;
    return productos;
  } catch (error) {
    console.log("ERROR");
    return null;
  }
};

export const evaluarEstatus = async (data: IMercadoPagoResponse) => {
  const estatus: MercadoPagoEstatus = data.status;
  switch (estatus) {
    case MercadoPagoEstatus.APPROVED:
    case MercadoPagoEstatus.AUTHORIZED:
      // Ejecuta la función para estados "aprobados/autorizados"
      exitoso(data.external_reference!);

      if (data.external_reference) {
        const dataUsuario: IUsuario | null = await buscarUsuarioPorIdPago(
          data.external_reference
        );

        const dataPedidoProducto = await buscarProductosPorIdPago(
          data.external_reference
        );

        const htmlBody = enviarCorreoExitoso(
          // data.payer.first_name,
          dataUsuario?.nombre || "",
          data.external_reference,
          dataPedidoProducto!
        );
        const emailService = new EmailService();
        emailService.sendEmail({
          to: dataUsuario?.email || "wertmullerf@gmail.com", //data.payer.email,
          subject: `Gracias Por Tu Compra`,
          //copiaOculta: "fwertmuller@gmail.com",
          htmlBody: htmlBody,
        });
      }
      break;

    case MercadoPagoEstatus.REJECTED:
    case MercadoPagoEstatus.CANCELLED:
    case MercadoPagoEstatus.REFUNDED:
      // Ejecuta la función para estados "rechazados/cancelados/reembolsados"
      fallido(data.external_reference!);
      break;

    default:
      // Opcional: Manejo de otros estados si es necesario
      console.log(`Estado no manejado: ${estatus}`);
      break;
  }
};

export const webhook = async (req: Request, res: Response) => {
  // MercadoPago puede enviar la notificación de diferentes formas
  const paymentId =
    req.query["data.id"] || // IPN notification
    req.body.data?.id || // Webhook notification
    req.query.id || // Payment notification
    req.body.id; // Direct payment data

  const type = req.query.type || req.body.type || "payment";

  if (paymentId) {
    try {
      const response = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        await evaluarEstatus(data);
      }
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(400);
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

export const generarExternalReference = () => {
  return uuidv4();
};

export const crearListaItems = async (productos: IPedidoProducto[]) => {
  try {
    const extraIds = new Set<string>();

    // Recolectamos todos los IDs de extras
    productos.forEach((producto) => {
      producto.personalizaciones?.extras?.forEach((extra) => {
        if (extra.id) {
          extraIds.add(extra.id.toString());
        }
      });
    });

    // Obtenemos los ingredientes extras
    let ingredientes: IIngrediente[] = [];
    if (extraIds.size > 0) {
      ingredientes = await obtenerIngredientesExtras([...extraIds]);
    }

    // Creamos un mapa para acceso rápido
    const ingredientesMap = new Map<string, IIngrediente>();
    ingredientes.forEach((ingrediente) => {
      ingredientesMap.set(ingrediente._id?.toString() ?? "", ingrediente);
    });

    // Creamos los items para MercadoPago
    return productos.map((producto) => {
      const precioExtras =
        producto.personalizaciones.extras?.reduce((acc, extra) => {
          const ingrediente = ingredientesMap.get(extra.id?.toString() ?? "");
          return acc + (ingrediente?.precioExtra ?? 0);
        }, 0) ?? 0;

      return {
        id: producto.producto_id as string,
        quantity: producto.cantidad, // Aquí estaba el error, no estábamos usando la cantidad
        title: producto.nombre as string,
        unit_price: producto.precio + precioExtras,
      };
    });
  } catch (error) {
    console.error("Error al generar la lista de productos:", error);
    throw new Error("No se pudo generar la lista de productos.");
  }
};

export const igualarPrecio = (items: any, productos: IPedidoProducto[]) => {
  for (let i = 0; i < items.length; i++) {
    productos[i].precio = items[i].unit_price;
  }
};

export const generarResponsePreferencia = async (
  preference: Preference,
  items: any,
  pago_id: string,
  FRONTEND_URL: string,
  BASE_NGROK_URL: string
) => {
  return await preference.create({
    body: {
      items,
      back_urls: {
        success: `${FRONTEND_URL}/pedido/${pago_id}`,
      },
      auto_return: "approved",
      expires: true, // Habilitar expiración
      expiration_date_from: new Date().toISOString(), // Desde ahora
      expiration_date_to: new Date(Date.now() + 20 * 60 * 1000).toISOString(), // 20 minutos después
      notification_url: `${BASE_NGROK_URL}/api/payment/webhook`,
      external_reference: pago_id,
    },

    requestOptions: {
      timeout: 10000,
    },
  });
};
