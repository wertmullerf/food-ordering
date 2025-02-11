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
          to: dataUsuario?.email || "augustocastellano06@gmail.com", //data.payer.email,
          subject: `Gracias Por Tu Compra`,
          copiaOculta: "fwertmuller@gmail.com",
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
  const payment = req.query;
  const paymentID = payment["data.id"];
  //const paymentID = payment.payment_id;
  try {
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    if (response.ok) {
      const data: IMercadoPagoResponse = await response.json();
      //console.log("EXTERNAL REFERENCE \n", data.external_reference);
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

export const generarExternalReference = () => {
  return uuidv4();
};

export const crearListaItems = async (productos: IPedidoProducto[]) => {
  try {
    const extraIds = new Set<string>();
  
    productos.forEach((producto) => {
      producto.personalizaciones?.extras?.forEach((extra) => {
        if (extra.id) {
          extraIds.add(extra.id.toString());
        }
      });
    });

    console.log("extraIds", extraIds);
    let ingredientes:IIngrediente[] = []
    if (extraIds.size > 0) {
      ingredientes = await obtenerIngredientesExtras([...extraIds]);
    }
    const ingredientesMap = new Map<string, IIngrediente>();

    ingredientes.forEach((ingrediente) => {
      ingredientesMap.set(ingrediente._id?.toString() ?? "", ingrediente);
    });
    
    return productos.map((producto) => {
      const precioExtras = producto.personalizaciones.extras?.reduce(
        (acc, extra) => {
          const ingrediente = ingredientesMap.get(extra.id?.toString() ?? "");
          return ingrediente
            ? acc + (ingrediente.precioExtra ?? 0) * extra.cantidad
            : acc;
        },
        0
      );

      return {
        id: producto.producto_id as string,
        quantity: 1,
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
