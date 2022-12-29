import csrfFetch, { storeCSRFToken } from "./csrf";

//Action constants
export const RECEIVE_LIKES = "likes/RECEIVE_LIKES";
export const REMOVE_LIKE = "likes/REMOVE_LIKE";

//Actions
const receiveLikes = (likes) => ({
  type: RECEIVE_LIKES,
  likes,
});
const removeLike = (likeId) => ({
  type: REMOVE_LIKE,
  likeId,
});

//Selectors
export const getLikes = (state) => {
  return state.likes ? Object.values(state.likes) : [];
};

//Thunk Action Creators

export const fetchUserLikes = () => async (dispatch) => {
  const res = await fetch(`/api/user_likes`);
  if (res.ok) {
    const userLikesObj = await res.json();
    dispatch(receiveLikes(userLikesObj.likes));
  }
};
export const fetchEventLikes = (eventId) => async (dispatch) => {
  const res = await fetch(`/api/event_likes/${eventId}`);
  if (res.ok) {
    const eventLikesObj = await res.json();
    dispatch(receiveLikes(eventLikesObj.likes));
  }
};

// export const createTicket = (eventId) => async (dispatch) => {
//   const res = await csrfFetch(`/api/events/${eventId}/tickets`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//   });
//   if (res.ok) {
//     const newTicket = await res.json();
//     dispatch(addNewTicket(newTicket));
//   }
// };

// //Tickets Reducer
// const ticketsReducer = (state = {}, action) => {
//   const newState = { ...state };

//   switch (action.type) {
//     case RECEIVE_TICKETS:
//       return { ...action.tickets };
//     case RECEIVE_TICKET:
//       return { [action.ticket.id]: action.ticket };
//     case ADD_NEW_TICKET:
//       newState[action.ticket.id] = action.ticket;
//       return newState;
//     case REMOVE_TICKET:
//       delete newState[action.ticketId];
//       return newState;
//     default:
//       return state;
//   }
// };

// export default ticketsReducer;
