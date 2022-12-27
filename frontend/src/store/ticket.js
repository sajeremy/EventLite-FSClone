import csrfFetch, { storeCSRFToken } from "./csrf";

//Action constants
export const RECEIVE_TICKETS = "tickets/RECEIVE_TICKETS";
export const RECEIVE_TICKET = "tickets/RECEIVE_TICKET";
export const REMOVE_TICKET = "tickets/REMOVE_TICKET";
export const ADD_NEW_TICKET = "ticekts/ADD_NEW_TICKET";

//Actions
const receiveTickets = (tickets) => ({
  type: RECEIVE_TICKETS,
  tickets,
});
const addNewTicket = (ticket) => ({
  type: ADD_NEW_TICKET,
  ticket,
});
const removeTicket = (ticketId) => ({
  type: REMOVE_TICKET,
  ticketId,
});

//Selectors
export const getTickets = (state) => {
  return state.tickets ? Object.values(state.tickets) : [];
};

export const getMyTickets = (state) => {
  const tickets = state.tickets ? Object.values(state.tickets) : [];
  const currentUser = state.session.user;

  return tickets.filter((ticket) => ticket.attendeeId === currentUser.id);
};

//Thunk Action Creators

export const fetchUserTickets = () => async (dispatch) => {
  const res = await fetch(`/api/tickets`);
  if (res.ok) {
    const ticketsObj = await res.json();
    // debugger;
    dispatch(receiveTickets(ticketsObj.tickets));
  }
};
// export const fetchEvent = (eventId) => async (dispatch) => {
//   const res = await fetch(`/api/events/${eventId}`);
//   if (res.ok) {
//     const eventObj = await res.json();
//     // debugger;
//     dispatch(receiveEvent(eventObj.event));
//   }
// };
export const createTicket = (eventId) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${eventId}/tickets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (res.ok) {
    const newTicket = await res.json();
    dispatch(addNewTicket(newTicket));
  }
};

//Tickets Reducer
const ticketsReducer = (state = {}, action) => {
  const newState = { ...state };

  switch (action.type) {
    case RECEIVE_TICKETS:
      return { ...action.tickets };
    case RECEIVE_TICKET:
      return { [action.ticket.id]: action.ticket };
    case ADD_NEW_TICKET:
      debugger;
      newState[action.ticket.id] = action.ticket;
      return newState;
    case REMOVE_TICKET:
      delete newState[action.ticketId];
      return newState;
    default:
      return state;
  }
};

export default ticketsReducer;
