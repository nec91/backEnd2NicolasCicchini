import { TicketRepository } from "../repositories/DAO_MONGO/ticket.repository.dao.js";

const ticketRepository = new TicketRepository();

class TicketService {
  constructor() {
    this.repository = ticketRepository;
  }

  createTicket = async (ticketData) => {
    try {
      return await this.repository.createTicket(ticketData);
    } catch (error) {
      throw new Error(`Error en el service (createTicket): ${error.message}`);
    }
  };

  getTicketById = async (id) => {
    try {
      return await this.repository.getTicketById(id);
    } catch (error) {
      throw new Error(`Error en el service (getTicketById): ${error.message}`);
    }
  };

  getAllTickets = async () => {
    try {
      return await this.repository.getAllTickets();
    } catch (error) {
      throw new Error(`Error en el service (getAllTickets): ${error.message}`);
    }
  };

  getTicketsByPurchaser = async (email) => {
    return await this.TicketRepository.getTicketsByPurchaser(email);
  };
}

export { TicketService };
