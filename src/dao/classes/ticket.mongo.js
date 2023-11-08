import ticketModel from "../models/ticket.model.js"

export default class Ticket {

    create = async (data) => {
        try {
            const ticket = await ticketModel.create(data)
            return ticket
        } catch (error) {
            console.error(error)
        }
    }

}