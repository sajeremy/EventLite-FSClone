import csrfFetch, { storeCSRFToken } from "./csrf";
import { useHistory } from "react-router-dom";
// import * as sessionActions from "../../store/session";

//

//Action constants
export const RECEIVE_EVENTS = "events/RECEIVE_EVENTS";
export const RECEIVE_EVENT = "events/RECEIVE_EVENT";
export const REMOVE_EVENT = "events/REMOVE_EVENT";
export const LIKE_EVENT = "events/LIKE_EVENT";
export const UNLIKE_EVENT = "events/UNLIKE_EVENT";

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
export const likeEvent = (eventId) => ({
  type: LIKE_EVENT,
  eventId,
});
export const unlikeEvent = (eventId) => ({
  type: UNLIKE_EVENT,
  eventId,
});

//Selectors
export const getEvent = (eventId) => (state) => {
  return state.events ? state.events[eventId] : null;
};
export const getEvents = (state) => {
  return state.events ? Object.values(state.events) : [];
};
export const getSortedUpcomingEvents = (state) => {
  if (state.events) {
    const eventsArr = Object.values(state.events);
    const upcomingEvents = eventsArr.filter(
      (event) => Date.parse(event.startDatetime) >= Date.now()
    );
    const sortedEvents = upcomingEvents.sort((a, b) => {
      return Date.parse(a.startDatetime) - Date.parse(b.startDatetime);
    });
    return sortedEvents;
  } else {
    return [];
  }
};
export const getSortedPastEvents = (state) => {
  if (state.events) {
    const eventsArr = Object.values(state.events);
    const upcomingEvents = eventsArr.filter(
      (event) => Date.parse(event.startDatetime) < Date.now()
    );
    const sortedEvents = upcomingEvents.sort((a, b) => {
      return Date.parse(a.startDatetime) - Date.parse(b.startDatetime);
    });
    return sortedEvents;
  } else {
    return [];
  }
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
export const getSortedCreatedEvents = (state) => {
  const events = state.events ? Object.values(state.events) : [];
  const currentUser = state.session.user;
  const myEvents = events.filter(
    (event) => event.organizerId === currentUser.id
  );
  const sortedEvents = myEvents.sort((a, b) => {
    return Date.parse(a.startDatetime) - Date.parse(b.startDatetime);
  });
  return sortedEvents;
};
export const getSortedAttendingEvents = (state) => {
  const events = state.events ? Object.values(state.events) : [];
  const tickets = state.tickets ? Object.values(state.tickets) : [];
  const eventTicketArr = tickets
    ? tickets.map((ticket) => ticket.eventsId)
    : [];
  const attendingEvents = eventTicketArr.map((eventId) => {
    // console.log(eventId);
    return events[eventId - 1];
  });
  const sortedAttendingEvents = attendingEvents.sort((a, b) => {
    return Date.parse(a.startDatetime) - Date.parse(b.startDatetime);
  });
  return sortedAttendingEvents;
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
    case LIKE_EVENT:
      debugger;
      //figure out how to import user Id
      // const userId = sessionActions.currentUser.id;
      // action.events[action.eventId].likes.push(userId);
      return { ...action.events };
    default:
      return state;
  }
};

export default eventsReducer;
