import { MailRepository } from "../repositories/DAO_MONGO/mail.repository.js";
import { config } from "../config/config.js";

class MailService {
  constructor() {
    this.mailRepository = new MailRepository();
  }

  sendPurchaseConfirmation = async (ticket, purchaser) => {
    const mailOptions = {
      from: `"Mi Tienda" <${config.MAIL_GMAIL_USER}>`,
      to: purchaser.email,
      subject: `Compra confirmada - Ticket ${ticket.code}`,
      html: `
        <h1>¡Gracias por tu compra!</h1>
        <p>Hola ${purchaser.name},</p>
        <p>Tu compra ha sido procesada con éxito.</p>
        <h2>Detalle del Ticket</h2>
        <ul>
          <li><strong>Código:</strong> ${ticket.code}</li>
          <li><strong>Fecha:</strong> ${ticket.purchase_datetime}</li>
          <li><strong>Total:</strong> $${ticket.amount}</li>
        </ul>
        <p>¡Gracias por confiar en nosotros!</p>
      `,
    };
  
    return await this.mailRepository.sendMail(mailOptions);
  };
}

export { MailService };
