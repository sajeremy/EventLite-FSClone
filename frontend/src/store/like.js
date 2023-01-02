import csrfFetch, { storeCSRFToken } from "./csrf";

//Action constants
export const RECEIVE_LIKES = "likes/RECEIVE_LIKES";
export const RECEIVE_LIKE = "likes/RECEIVE_LIKE";
export const REMOVE_LIKE = "likes/REMOVE_LIKE";

//Actions
const receiveLikes = (likes) => ({
  type: RECEIVE_LIKES,
  likes,
});
const receiveLike = (like) => ({
  type: RECEIVE_LIKE,
  like,
});
const removeLike = (eventId) => ({
  type: REMOVE_LIKE,
  eventId,
});

//Selectors
export const getLikes = (state) => {
  return state.likes ? Object.values(state.likes) : [];
};
export const getLikedEvents = (state) => {
  const events = state.events ? Object.values(state.events) : [];
  const likedEventsArr = state.likes;
  const likedEvents = events.filter((event) =>
    likedEventsArr.includes(event.id)
  );
  return likedEvents;
};

//Thunk Action Creators

export const fetchUserLikes = () => async (dispatch) => {
  const res = await fetch(`/api/user_likes`);
  if (res.ok) {
    const userLikesObj = await res.json();
    // debugger;
    dispatch(receiveLikes(userLikesObj.likes));
  }
};
// export const fetchEventLikes = (eventId) => async (dispatch) => {
//   const res = await fetch(`/api/event_likes/${eventId}`);
//   if (res.ok) {
//     const eventLikesObj = await res.json();
//     dispatch(receiveLikes(eventLikesObj.likes));
//   }
// };

export const createLike = (like) => async (dispatch) => {
  const res = await csrfFetch(`/api/likes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(like),
  });
  if (res.ok) {
    const newLike = await res.json();
    dispatch(receiveLike(newLike));
  }
};

export const deleteLike = (eventId) => async (dispatch) => {
  await csrfFetch(`/api/likes/${eventId}`, { method: "DELETE" });
  dispatch(removeLike(eventId));
};

//Likes Reducer
const likesReducer = (state = [], action) => {
  const newState = [...state];

  switch (action.type) {
    case RECEIVE_LIKES:
      return action.likes;
    case RECEIVE_LIKE:
      newState.push(action.like.likes.event_id);
      return newState;
    case REMOVE_LIKE:
      const index = newState.indexOf(action.eventId);
      if (index > -1) newState.splice(index, 1);
      return newState;
    default:
      return state;
  }
};

export default likesReducer;
