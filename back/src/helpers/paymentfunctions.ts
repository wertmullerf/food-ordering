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
                const dataUsuario: IUsuario | null =
                    await buscarUsuarioPorIdPago(data.external_reference);

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
                    to: dataUsuario?.email || data.payer.email,
                    subject: `Gracias Por Tu Compra`,
                    copiaOculta: ["fwertmuller@gmail.com"],
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
            console.log("EXTERNAL REFERENCE \n", data.external_reference);
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

export const generarExternalReference = () => {
    return uuidv4();
};
