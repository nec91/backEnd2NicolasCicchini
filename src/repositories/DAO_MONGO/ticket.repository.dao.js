import { TicketModel } from "../models/ticket.model.js";

class TicketRepository {
  constructor() {
    this.model = TicketModel;
  }

  createTicket = async (ticketData) => {
    try {
      const newTicket = await this.model.create(ticketData);
      return newTicket;
    } catch (error) {
      throw new Error(`Error en el repository (createTicket): ${error.message}`);
    }
  };

  getTicketById = async (id) => {
    try {
      return await this.model.findById(id).lean();
    } catch (error) {
      throw new Error(`Error en el repository (getTicketById): ${error.message}`);
    }
  };

  getAllTickets = async () => {
    try {
      return await this.model.find().lean();
    } catch (error) {
      throw new Error(`Error en el repository (getAllTickets): ${error.message}`);
    }
  };

  getTicketsByPurchaser = async (email) => {
    try {
      return await this.model.find({ purchaser: email }).lean();
    } catch (error) {
      throw new Error(`Error en el repository (getTicketsByPurchaser): ${error.message}`);
    }
  };
}

export { TicketRepository };
