import { TicketService } from "../services/ticket.service.js";

const ticketService = new TicketService();

class TicketController {
  constructor() {}

  createTicket = async (req, res) => {
    try {
      const { amount, purchaser } = req.body;

      if (!amount || !purchaser) {
        return res.status(400).send({ status: "error", message: "Faltan campos requeridos." });
      }

      const newTicket = await ticketService.createTicket({ amount, purchaser });
      res.status(201).send({ status: "success", ticket: newTicket });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ status: "error", message: "Error al crear el ticket." });
    }
  };

  getTicketById = async (req, res) => {
    try {
      const { tid } = req.params;
      const ticket = await ticketService.getTicketById(tid);

      if (!ticket) {
        return res.status(404).send({ status: "error", message: "Ticket no encontrado" });
      }

      res.send({ status: "success", ticket });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ status: "error", message: "Error al obtener el ticket." });
    }
  };

  getAllTickets = async (req, res) => {
    try {
      const tickets = await ticketService.getAllTickets();
      res.send({ status: "success", tickets });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ status: "error", message: "Error al obtener los tickets." });
    }
  };
}

export const ticketController = new TicketController();
