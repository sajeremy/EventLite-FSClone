import csrfFetch, { storeCSRFToken } from "./csrf";
import { useHistory } from "react-router-dom";

//

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
  return state.events ? state.events[eventId] : null;
};
export const getEvents = (state) => {
  return state.events ? Object.values(state.events) : [];
};
// export const getCreatedEvents = (state) => {
//   const totalEvents = state.events;
//   const user = state.session.user;

//   if (Object.keys(totalEvents).length !== 0 && user) {
//     const createdEvents = user.eventIds;
//     const totalEventsArr = Object.entries(totalEvents);
//     const filteredEvents = totalEventsArr.filter(([k, v]) =>
//       createdEvents.includes(parseInt(k))
//     );
//     const createdEventsObj = Object.fromEntries(filteredEvents);
//     return Object.values(createdEventsObj);
//   } else return [];
// };
export const getCreatedEvents = (state) => {
  const events = state.events ? Object.values(state.events) : [];
  const currentUser = state.session.user;

  return events.filter((event) => event.organizerId === currentUser.id);
};

//Thunk Action Creators
export const fetchEvents = () => async (dispatch) => {
  const res = await fetch(`/api/events`);
  if (res.ok) {
    const eventsObj = await res.json();
    // debugger;
    dispatch(receiveEvents(eventsObj.events));
  }
};
export const fetchEvent = (eventId) => async (dispatch) => {
  const res = await fetch(`/api/events/${eventId}`);
  if (res.ok) {
    const eventObj = await res.json();
    // debugger;
    dispatch(receiveEvent(eventObj.event));
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
export const createFormEvent = (formData, setPhotoFile) => async (dispatch) => {
  const history = useHistory();
  const res = await csrfFetch(`/api/events`, {
    method: "POST",
    body: formData,
  });
  if (res.ok) {
    history.push("/");
  }
  // if (res.ok) {
  //   debugger;
  //   const newEvent = await res.json();
  //   dispatch(receiveEvent(newEvent));
  //   setPhotoFile(null);
  //   history.push("/");
  // }
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
  await csrfFetch(`/api/events/${eventId}`, { method: "DELETE" });
  dispatch(removeEvent(eventId));
};

//Events Reducer
const eventsReducer = (state = {}, action) => {
  const newState = { ...state };

  switch (action.type) {
    case RECEIVE_EVENTS:
      return { ...action.events };
    case RECEIVE_EVENT:
      return { [action.event.id]: action.event };
    case REMOVE_EVENT:
      delete newState[action.eventId];
      return newState;
    default:
      return state;
  }
};

export default eventsReducer;
