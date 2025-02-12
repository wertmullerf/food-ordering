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
    auth: {
      user: MAILER_EMAIL,
      pass: MAILER_SECRET_KEY,
    },
  });

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody } = options;
    try {
      const sendInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        //bcc: copiaOculta,
        html: htmlBody,
      });
      console.log(sendInformation + " neneee");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
