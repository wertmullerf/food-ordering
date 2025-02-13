import nodemailer from "nodemailer";
import { MAILER_EMAIL, MAILER_SECRET_KEY, MAILER_SERVICE } from "../../config";

interface SendMailOptions {
  to: string;
  subject: string;
  //copiaOculta: string;
  htmlBody: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: MAILER_SERVICE,
    host: "smtp.gmail.com", // Especificamos el host
    port: 587, // Puerto para TLS
    secure: false, // true para 465, false para otros puertos
    auth: {
      user: MAILER_EMAIL,
      pass: MAILER_SECRET_KEY,
    },
    tls: {
      rejectUnauthorized: false, // Ayuda con problemas de certificados
    },
  });

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody } = options;

    console.log("Configuración del transportador:", {
      service: MAILER_SERVICE,
      host: "smtp.gmail.com",
      port: 587,
      user: MAILER_EMAIL,
    });

    try {
      // Verificar la conexión antes de enviar
      await this.transporter.verify();
      console.log("Servidor listo para enviar emails");

      const sendInformation = await this.transporter.sendMail({
        from: `"Burger House" <${MAILER_EMAIL}>`, // Nombre más amigable
        to: to,
        subject: subject,
        html: htmlBody,
        headers: {
          priority: "high",
        },
      });

      console.log(
        "Información del envío:",
        JSON.stringify(sendInformation, null, 2)
      );
      console.log("ID del mensaje:", sendInformation.messageId);

      return true;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al enviar email:", {
          message: error.message,
          name: error.name,
          stack: error.stack,
        });
      } else {
        console.error("Error desconocido:", error);
      }
      return false;
    }
  }
}
