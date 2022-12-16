import csrfFetch, { storeCSRFToken } from "./csrf";

//Action constants
export const RECEIVE_TICKETS = "tickets/RECEIVE_TICKETS";
export const RECEIVE_TICKET = "tickets/RECEIVE_TICKET";
export const REMOVE_TICKET = "tickets/REMOVE_TICKET";

//Actions
const receieveTickets = (tickets) => ({
  type: RECEIVE_TICKETS,
  tickets,
});
const receieveTicket = (ticket) => ({
  type: RECEIVE_TICKET,
  ticket,
});
const removeTicket = (ticketId) => ({
  type: REMOVE_TICKET,
  ticketId,
});

//Selectors
