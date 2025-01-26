import nodemailer from "nodemailer";

interface SendMailOptions {
    to: string;
    subject: string;
    copiaOculta: string[];
    htmlBody: string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: process.env.MAILER_SERVICE,
        auth: {
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_SECRET_KEY,
        },
    });

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, copiaOculta } = options;
        try {
            const sendInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                bcc: copiaOculta,
                html: htmlBody,
            });
            console.log(sendInformation);
            return true;
        } catch (error) {
            return false;
        }
    }
}
