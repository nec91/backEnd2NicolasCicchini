import nodemailer from "nodemailer";
import { config } from "../../config/config.js";

class MailRepository {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.MAIL_GMAIL_USER,
        pass: config.MAIL_GMAIL_PASSWORD,
      },
    });
  }

  sendMail = async (mailOptions) => {
    try {
      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      throw new Error(`Error enviando correo: ${error.message}`);
    }
  };
}

export { MailRepository };

