import csrfFetch, { storeCSRFToken } from "./csrf";

//Action constants
export const RECEIVE_EVENTS = "events/RECEIVE_EVENTS";
export const RECEIVE_EVENT = "events/RECEIVE_EVENT";
export const REMOVE_EVENT = "events/REMOVE_EVENT";

//Actions
const receiveEvents = (events) => ({
  type: RECEIVE_EVENTS,
  events,
});
const receiveEvent = (event) => ({
  type: RECEIVE_EVENT,
  event,
});
const removeEvent = (eventId) => ({
  type: REMOVE_EVENT,
  eventId,
});

//Selectors
export const getEvent = (eventId) => (state) => {
  return state.events.events ? state.events.events[eventId] : null;
};
export const getEvents = (state) => {
  return state.events.events ? Object.values(state.events.events) : [];
};

//Thunk Action Creators
export const fetchEvents = () => async (dispatch) => {
  const res = await fetch(`/api/events`);
  if (res.ok) {
    const events = await res.json();
    dispatch(receiveEvents(events));
  }
};
export const fetchEvent = (eventId) => async (dispatch) => {
  const res = await fetch(`/api/events/${eventId}`);
  if (res.ok) {
    const event = await res.json();
    dispatch(receiveEvent(event));
  }
};
export const createEvent = (event) => async (dispatch) => {
  const res = await csrfFetch(`/api/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  if (res.ok) {
    const newEvent = await res.json();
    dispatch(receiveEvent(newEvent));
  }
};
export const updateEvent = (event) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${event.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  if (res.ok) {
    const updatedEvent = await res.json();
    dispatch(receiveEvent(updatedEvent));
  }
};

export const deleteEvent = (eventId) => async (dispatch) => {
  await csrfFetch(`/api/posts/${eventId}`, { method: "DELETE" });
  dispatch(removeEvent(eventId));
};

//Events Reducer
const eventsReducer = (state = {}, action) => {
  const newState = { ...state };

  switch (action.type) {
    case RECEIVE_EVENTS:
      return { ...action.events };
    case RECEIVE_EVENT:
      newState[action.event.id] = action.event;
      return newState;
    case REMOVE_EVENT:
      delete newState[action.eventId];
      return newState;
    default:
      return state;
  }
};

export default eventsReducer;
