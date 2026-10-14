import { getConfirmationById, getTicketOptionsForRoute } from '../../models/model.js';

export default async (req, res) => {
    const { confirmationId } = req.params;

    const confirmation = await getConfirmationById(confirmationId);
    const ticketOptions = await getTicketOptionsForRoute(confirmation.routeId);
    const ticket = ticketOptions.find(option => option.class === confirmation.ticketClass);

    res.render('routes/confirm', {
        title: 'Trip Confirmation',
        confirmation,
        ticketPrice: ticket.price,
        totalAmount: ticket.price * confirmation.passengers.length
    });
};